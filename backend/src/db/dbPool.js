import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === "production"

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DB_HOST || 'postgres',
  database: process.env.POSTGRES_DB,
  port: 5432
});

export default pool;