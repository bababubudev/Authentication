import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import sessionStore from "./middleware/sessionStore";

const app = express();

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie", "Date", "ETag"]
}));

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionStore);

app.use((req, res, next) => {
  console.log("session: ", req.session);
  console.log("session id: ", req.session.user);
  next();
});

app.use("/api/users", userRoutes);

export default app;