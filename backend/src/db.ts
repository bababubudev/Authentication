import { Pool } from "pg";

const isProduction: boolean = process.env.NODE_ENV === "production";

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const pool: Pool = new Pool({
  connectionString: isProduction ? process.env.DB_URL : connectionString,
});

export default pool;