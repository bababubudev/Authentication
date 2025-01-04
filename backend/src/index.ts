import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT: string | undefined = process.env.PORT;
const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9_\-]{3,16}$/;
const EMAIL_REGEX: RegExp = /\S+@\S+\.\S+/;
const PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

app.get("/api/", (req, res) => {
  res.json({ "message": "Hello API!" });
});

app.get("/api/dashboard", (req, res) => {

});

app.post("/api/users/login", (req, res) => {
  let { username, password } = req.body;
  res.status(200).json({ message: "Login requested!", data: { username, password } })
});

app.post("/api/users/register", (req, res) => {
  let { username, email, password, confirmPassword } = req.body;

  let errors: string[] = [];

  if (!username || !email || !password || !confirmPassword) {
    errors.push("Please enter all fields");
  }

  if (username && !USERNAME_REGEX.test(username)) {
    errors.push("Username must be 3-16 characters long, and may include '-' or '_'.");
  }

  if (email && !EMAIL_REGEX.test(email)) {
    errors.push("Invalid email address");
  }

  if (password && !PASSWORD_REGEX.test(password)) {
    errors.push(
      "Password must be at least 8 characters long, contain one digit, and one special character."
    );
  }

  if (password && confirmPassword && password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Error registering user.", data: errors });
  }

  console.log("User registered: " + { username, email });

  res.status(201).json({
    message: "User registered!",
    data: { username, email },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});