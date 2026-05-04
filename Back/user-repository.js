import crypto from "crypto";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./config.js";

// db se inyecta desde index.js
let usersCollection;

export const initUserRepository = (db) => {
  usersCollection = db.collection("usuarios");
};

export class UserRepository {
  static async create({ username, password, role = "vendedor" }) {
    Validation.username(username);
    Validation.password(password);

    const existe = await usersCollection.findOne({ username });
    if (existe) throw new Error("El nombre de usuario ya existe.");

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await usersCollection.insertOne({
      _id: id,
      username,
      password: hashedPassword,
      role,
      creadoEn: new Date(),
      ultimoLogin: null,
    });

    return id;
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = await usersCollection.findOne({ username: username });
    if (!user) throw new Error("El nombre de usuario no existe.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Contraseña incorrecta.");

    // Guardar último login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { ultimoLogin: new Date() } }
    );

    const { password: _, ...publicUser } = user;
    return publicUser;
  }

  static async findAll() {
    const users = await usersCollection.find().toArray();
    return users.map(({ password, ...u }) => u);
  }
}

class Validation {
  static username(username) {
    if (typeof username !== "string")
      throw new Error("El nombre de usuario debe ser una cadena de caracteres.");
    if (username.length < 3)
      throw new Error("El nombre de usuario debe tener al menos 3 caracteres.");
  }
  static password(password) {
    if (typeof password !== "string")
      throw new Error("La contraseña debe ser una cadena de caracteres.");
    if (password.length < 6)
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
  }
}