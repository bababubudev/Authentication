import { hashToken } from "../utils/sessionHelper.js";
import { queries } from "../db/query.js";
import pool from "../db/dbPool.js";

export default async function authorize(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403).json({ message: "Not authenticated" });
      return;
    }

    const tokenHash = hashToken(token);
    const { rows } = await pool.query(queries.validateSession, [tokenHash]);

    if (!rows[0]) {
      res.clearCookie("token");
      res.status(403).json({ message: "Session expired. Try reloading the page." });
      return;
    }

    req.user = rows[0];
    next();
  }
  catch (err) {
    res.clearCookie("token");
    res.status(403).json({ message: "Unauthorized with error!", error: err.message });
  }
}