import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === "production";

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

const host = isProduction ? process.env.DB_HOST : "localhost";
const connectionString = `postgresql://${user}:${password}@${host}:5432/${database}`;

const pool = new Pool({ connectionString });

export default pool;