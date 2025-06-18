import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DB_URL!;
export const SECRET = process.env.SECRET!;
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;
