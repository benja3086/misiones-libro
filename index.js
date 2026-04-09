import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 1. Primero creá la app
const app = express();

// 2. Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 3. Variables y helpers
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "data", "Libros.json");
const leerDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const guardarDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// 4. Middleware de auth
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

// 5. Rutas de auth
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_JWT_KEY, { expiresIn: "1h" });
    res.cookie("access_token", token, { httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 }).send({ user });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create({ username, password });
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

// 6. Rutas de productos
app.get("/productos", (req, res) => {
  const db = leerDB();
  res.send(db.producto);
});

app.post("/productos", authenticateToken, (req, res) => {
  const db = leerDB();
  const nuevo = { ...req.body, id: Date.now() };
  db.producto.push(nuevo);
  guardarDB(db);
  res.send(nuevo);
});

app.put("/productos/:id", authenticateToken, (req, res) => {
  const db = leerDB();
  const idx = db.producto.findIndex((p) => p.id == req.params.id);
  if (idx === -1) return res.status(404).send({ error: "Producto no encontrado" });
  db.producto[idx] = { ...db.producto[idx], ...req.body };
  guardarDB(db);
  res.send(db.producto[idx]);
});

app.delete("/productos/:id", authenticateToken, (req, res) => {
  const db = leerDB();
  db.producto = db.producto.filter((p) => p.id != req.params.id);
  guardarDB(db);
  res.send({ ok: true });
});

// 7. Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});