import { Request, Response } from "express";
import pool from "../db/db";
import bcrypt from "bcrypt";
import { isEmailValid, isPasswordValid, isUsernameValid } from "../utils/validation";
import { createUserQuery, getUserByEmailQuery } from "../db/query";

async function loginUser(req: Request, res: Response) {
  let { username, password } = req.body;
  res.status(200).json({ message: "Login requested!", data: { username, password } });
}

async function registerUser(req: Request, res: Response) {
  let { username, email, password, confirmPassword } = req.body;

  let errors: string[] = [];

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
  }

  try {
    const { rows } = await pool.query(getUserByEmailQuery, [email]);
    if (rows.length > 0) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    await pool.query(createUserQuery, [username, email, hasedPassword]);

    res.status(201).json({
      message: "User registered!",
      data: { username, email },
    });
  }
  catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  registerUser, loginUser
}