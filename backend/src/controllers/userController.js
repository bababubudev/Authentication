import pool from "../db/dbPool.js";
import bcrypt from "bcrypt";

import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validation.js";
import { createUserQuery, getUserByEmailQuery } from "../db/query.js";

async function loginUser(req, res) {
  let { email, password } = req.body;

  try {
    const { rows } = await pool.query(getUserByEmailQuery, [email]);
    const user = rows[0];
    console.log(
      "Login attempted with: ",
      email,
      user ? "For: " + user : ""
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.status(200)
      .set({
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Expose-Headers": "Set-Cookie",
      })
      .json({
        message: "Login successful",
        data: { id: user.id, username: user.username, email: user.email },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function registerUser(req, res) {
  let { username, email, password, confirmPassword } = req.body;

  let errors = [];

  if (!username || !isUsernameValid(username)) {
    errors.push("Username must be 3-16 characters long, and may include '-' or '_'.");
  }

  if (!email || !isEmailValid(email)) {
    errors.push("Invalid email address");
  }

  if (!password || !isPasswordValid(password)) {
    errors.push(
      "Password must be at least 8 characters long, contain one digit, and one special character."
    );
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Error registering user.", data: errors });
    return;
  }

  try {
    const { rows } = await pool.query(getUserByEmailQuery, [email]);
    if (rows.length > 0) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const idResult = await pool.query(createUserQuery + " RETURNING id", [username, email, hasedPassword]);
    const id = idResult.rows[0];

    const jwtToken = jwtGenerator(id);

    res.status(201).json({
      message: "User registered!",
      data: { id, username, email, jwtToken },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  loginUser,
  registerUser,
};
