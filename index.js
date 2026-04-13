import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";
import { MongoClient } from "mongodb";

const MONGO_URI =
  "mongodb+srv://benjamin:benja3086@cluster0.su1vd9a.mongodb.net/?appName=Cluster0";
const DB_NAME = "misiones-libro";

const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db(DB_NAME);
const productos = db.collection("libros");

console.log("✅ Conectado a MongoDB");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send({ error: "No autorizado" });
  try {
    req.user = jwt.verify(token, SECRET_JWT_KEY);
    next();
  } catch {
    res.status(403).send({ error: "Token inválido" });
  }
};

// Auth
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      SECRET_JWT_KEY,
      { expiresIn: "1h" },
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .send({ user });
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

app.get("/protected", authenticateToken, (req, res) => {
  res.send({ user: req.user });
});

// Productos
app.get("/productos", async (req, res) => {
  const lista = await productos.find().toArray();
  res.send(lista);
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
    producto: req.body.producto,
    metodoPago: req.body.metodoPago,
    nombreComprador: req.body.nombreComprador || null,
    comentario: req.body.comentario || null, // 👈 agregá esta línea
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

// Usuarios
app.get("/usuarios", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send({ error: "No autorizado" });
  const users = User.find();
  const sinPassword = users.map(({ password, ...u }) => u);
  res.send(sinPassword);
});

app.delete("/usuarios/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).send({ error: "No autorizado" });
  User.delete({ _id: req.params.id });
  res.send({ ok: true });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
