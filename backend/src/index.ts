import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api/", (req, res) => {
  res.json({ "message": "Hello API!" });
});

app.get("/api/users/register", (req, res) => {

});

app.get("/api/users/login", (req, res) => {

});

app.get("/api/dashboard", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});