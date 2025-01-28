import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === "production";

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

const connectionString = `postgresql://${user}:${password}@localhost:5432/${database}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DB_URL : connectionString,
});

export default pool;