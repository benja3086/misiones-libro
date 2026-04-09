export const PORT = process.env.PORT ?? 3000;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
export const SECRET_JWT_KEY = process.env.JWT_SECRET ?? '123456';