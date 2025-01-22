import pool from "../db/dbPool.js";
import bcrypt from "bcrypt";

import { hashToken, generateSessionExpiry, generateToken } from "../utils/sessionHelper.js";
import { queries } from "../db/query.js";
import { isEmailValid } from "../utils/validation.js";

async function loginUser(req, res) {
  let { emailOrUsername, password } = req.body;

  try {
    const isEmail = isEmailValid(emailOrUsername);
    const email = isEmail ? emailOrUsername : null;
    const username = isEmail ? null : emailOrUsername;

    const { rows } = await pool.query(queries.getUserByEmailOrUsername, [email, username]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    await pool.query(queries.updateLastLogin, [user.id]);

    const token = generateToken();
    const tokenHash = hashToken(token);

    await pool.query(queries.createSession, [
      user.id,
      tokenHash,
      generateSessionExpiry(),
      req.ip,
      req.get("user-agent"),
    ]);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      data: { ...user }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function registerUser(req, res) {
  let { username, email, password } = req.body;

  try {
    const { rows } = await pool.query(queries.getUserByEmailOrUsername, [email, username]);

    if (rows.length > 0) {
      res.status(409).json({ message: "Email or username is already registered" });
      return;
    }

    const hasedPassword = await bcrypt.hash(password, 12);
    const result = await pool.query(queries.createUser, [username, email.toLowerCase(), hasedPassword]);

    const user = result.rows[0];
    const token = generateToken();
    const tokenHash = hashToken(token);

    await pool.query(queries.createSession, [
      user.id,
      tokenHash,
      generateSessionExpiry(),
      req.ip,
      req.get("user-agent"),
    ]);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered!",
      data: { ...user },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;
    if (token) {
      const tokenHash = hashToken(token);
      await pool.query(queries.deleteSession, [tokenHash]);
    }

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out succesfully" });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function verifyUser(req, res) {
  try {
    return res.status(200).json({ message: "User verified!", data: req.user });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function changePassword(req, res) {
  const { currentPassword, password } = req.body;
  const userId = req.user.user_id;

  try {
    const { rows } = await pool.query(queries.validatePassword, [userId]);
    const user = rows[0];

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hasedPassword = await bcrypt.hash(password, 12);
    await pool.query(queries.updatePassword, [hasedPassword, userId]);

    res.status(200).json({ message: "Password updated succesfully" });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  loginUser,
  registerUser,
  logoutUser,
  verifyUser,
  changePassword,
};
