import pool from "../db/dbPool.js";
import bcrypt from "bcrypt";

import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validation.js";
import { createUserQuery, getUserByEmailQuery } from "../db/query.js";
import { jwtGenerator } from "../utils/jwtHelper.js";

async function loginUser(req, res) {
  let { email, password } = req.body;

  try {
    const { rows } = await pool.query(getUserByEmailQuery, [email]);
    const user = rows[0];

    console.log(
      "Login attempted with: ",
      email,
      user ? "\nFor: " + JSON.stringify({ username: user.username, email: user.email }) : ""
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwtGenerator({ user: user.id });
    console.log("Generated token: " + token);

    res.status(200)
      .set({
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Expose-Headers": "Set-Cookie",
      })
      .json({
        message: "Login successful",
        data: { token },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function registerUser(req, res) {
  let { username, email, password, confirmPassword } = req.body;

  try {
    const { rows } = await pool.query(getUserByEmailQuery, [email]);
    if (rows.length > 0) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const idResult = await pool.query(createUserQuery + " RETURNING id", [username, email, hasedPassword]);
    const { id } = idResult.rows[0];

    console.log(id);
    const token = jwtGenerator({ user: id });

    res.status(201).json({
      message: "User registered!",
      data: { id, token },
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
