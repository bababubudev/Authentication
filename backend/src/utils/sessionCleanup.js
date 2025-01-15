import cron from "node-cron";
import { queries } from "../db/query.js";
import pool from "../db/dbPool.js";

export async function cleanupSessions() {
  const client = await pool.connect();

  try {
    console.log("Starting session cleanup...");

    await client.query('BEGIN');
    const { rowCount: expiredCount } = await client.query(queries.deleteExpiredQuery);
    const { rowCount: remainingCount } = await client.query('DELETE FROM sessions');
    await client.query('COMMIT');

    console.log(`Cleanup complete: Removed ${expiredCount} expired and ${remainingCount} active sessions.`);
  }
  catch (err) {
    await client.query('ROLLBACK');
    console.error("Session cleanup failed: ", err);
    throw err;
  }
  finally {
    client.release();
  }
}

export function setupGracefulShutdown(server) {
  async function shutdown() {
    console.log("Recieved shutdown signal. Cleaning up...");

    try {
      await new Promise((resolve) => { server.close(resolve); });
      console.log("Server closed");

      await pool.end();
      console.log("Database pool closed");

      process.exit(0);
    }
    catch (err) {
      console.error("Error during shutdown: ", err);
      process.exit(1);
    }
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

const removeExpiredSessions = () => {
  pool.query("DELETE FROM sessions WHERE expires_at < NOW()");
};

cron.schedule("0 0 * * *", removeExpiredSessions);