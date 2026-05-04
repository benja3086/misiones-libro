import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ?? 3000
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY ?? process.env.JWT_SECRET
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? 10)
