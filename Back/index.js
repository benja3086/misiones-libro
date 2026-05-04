import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ObjectId } from "mongodb";
import { PORT } from "./config.js";
import { UserRepository, initUserRepository } from "./user-repository.js";
import { MongoClient } from "mongodb";

const getJwtSecret = () => {
  const secret = process.env.SECRET_JWT_KEY || process.env.JWT_SECRET;
  return typeof secret === "string" ? secret.trim() : "";
};

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_LOCAL;
const DB_NAME = "misiones-libro";

const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db(DB_NAME);
const productos = db.collection("libros");
initUserRepository(db);

console.log("✅ Conectado a MongoDB");
await client.connect();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tiendamisiones.vercel.app",
      "https://tiendamisiones-ko965sdvq-benja3086s-projects.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const authenticateToken = (req, res, next) => {
  const token =
    req.cookies.access_token ||
    req.headers.authorization?.replace("Bearer ", "");
  const jwtSecret = getJwtSecret();

  if (!jwtSecret) {
    return res
      .status(500)
      .send({ error: "Error de configuración del servidor (JWT)."});
  }
  if (!token) return res.status(401).send({ error: "No autorizado" });
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(403).send({ error: "Token inválido" });
  }
};

// Auth
app.post("/login", async (req, res) => {
   const jwtSecret = getJwtSecret();

  if (!jwtSecret) {
    return res
      .status(500)
      .send({ error: "Error de configuración del servidor (JWT)."+jwtSecret  });
  }
  try {
    const { username, password } = req.body;
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: "1h" },
    );   

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60,
      })
      .send({ user, token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const id = await UserRepository.create({ username, password, role });
    res.send({ id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("access_token").send({ message: "Logout exitoso" });
});

app.get("/me", authenticateToken, (req, res) => {
  res.send({ user: req.user });
});

app.get("/protected", authenticateToken, (req, res) => {
  res.send({ user: req.user });
});

// Productos
app.get("/productos", async (req, res) => {
  const lista = await productos.find().toArray();
  res.send(lista);
});
app.get("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const producto = await productos.findOne({ id });

  if (!producto) {
    return res.status(404).send({ error: "Producto no encontrado" });
  }

  res.send(producto);
});
app.post("/productos", authenticateToken, async (req, res) => {
  const nuevo = { ...req.body, id: Date.now() };
  await productos.insertOne(nuevo);
  res.send(nuevo);
});

app.put("/productos/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { _id, __v, ...datos } = req.body;
  const result = await productos.findOneAndUpdate(
    { id },
    { $set: datos },
    { returnDocument: "after" },
  );
  if (!result) return res.status(404).send({ error: "Producto no encontrado" });
  res.send(result);
});

app.delete("/productos/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);
  await productos.deleteOne({ id });
  res.send({ ok: true });
});

// Ventas
app.post("/ventas", authenticateToken, async (req, res) => {
  const ventasCollection = db.collection("ventas");

  const producto = await productos.findOne({ id: req.body.producto.id });
  if (!producto)
    return res.status(404).send({ error: "Producto no encontrado" });
  if (producto.stock == null || producto.stock <= 0)
    return res.status(400).send({ error: "Sin stock disponible" });

  await productos.findOneAndUpdate(
    { id: req.body.producto.id },
    { $inc: { stock: -1 } },
  );

  const venta = {
    producto: {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      autor: producto.autor || null,
    },
    metodoPago: req.body.metodoPago,
    nombreComprador: req.body.nombreComprador || null,
    comentario: req.body.comentario || null,
    usuario: req.user.username,
    fecha: new Date(),
  };
  await ventasCollection.insertOne(venta);
  res.send({ ok: true, venta });
});

app.get("/ventas", authenticateToken, async (req, res) => {
  const ventasCollection = db.collection("ventas");
  const lista = await ventasCollection.find().sort({ fecha: -1 }).toArray();
  res.send(lista);
});

app.delete("/ventas/:id", authenticateToken, async (req, res) => {
  const ventasCollection = db.collection("ventas");
  try {
    const result = await ventasCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0)
      return res.status(404).send({ error: "Venta no encontrada" });
    res.send({ ok: true });
  } catch {
    res.status(400).send({ error: "ID inválido" });
  }
});

// Usuarios
app.get("/usuarios", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send({ error: "No autorizado" });
  const users = await UserRepository.findAll();
  res.send(users);
});

app.delete("/usuarios/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send({ error: "No autorizado" });
  const usersCollection = db.collection("usuarios");
  await usersCollection.deleteOne({ _id: req.params.id });
  res.send({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
