import DBlocal from "db-local";
import crypto from "crypto";
import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "./config.js";
const { Schema } = new DBlocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export class UserRepository {
  static async create({ username, password, role = "user" }) {
    Validation.username(username);
    Validation.password(password);
    const user = User.findOne({ username });
    if (user) throw new Error("El nombre de usuario ya existe.");

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    User.create({
      _id: id,
      username,
      password: hashedPassword,
      role,
    }).save();

    return id;
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) throw new Error("El nombre de usuario no existe.");

    const IsValid = await bcrypt.compare(password, user.password);
    if (!IsValid) throw new Error("Contraseña incorrecta.");

    const { password: _, ...publicUser } = user;
    return publicUser;
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