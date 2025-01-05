import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;