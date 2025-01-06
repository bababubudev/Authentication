import cron from "node-cron";
import pool from "../db/dbPool.js";

const cleanupSessions = () => {
  pool.query("DELETE FROM sessions WHERE expires_at < NOW()");
};

cron.schedule("0 0 * * *", cleanupSessions);