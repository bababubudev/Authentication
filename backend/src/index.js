import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { cleanupSessions, setupGracefulShutdown } from "./utils/sessionCleanup.js";
const PORT = process.env.SERVER_PORT;

async function startServer() {
  try {
    await cleanupSessions();
    const server = app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });

    setupGracefulShutdown(server);
  }
  catch (err) {
    console.error("Failed to start server\n", err);
    process.exit(1);
  }
}

startServer();