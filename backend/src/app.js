import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;