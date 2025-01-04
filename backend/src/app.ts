import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import sessionStore from "./middleware/sessionStore";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionStore)
app.use("/api/users", userRoutes);

export default app;