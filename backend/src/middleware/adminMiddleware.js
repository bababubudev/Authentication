import pool from "../db/dbPool.js";
import { adminQueries } from "../db/query.js";

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "forbidden - Admin access required"
    });
  }

  next();
}

export async function checkAdminModification(req, res, next) {
  const { userId } = req.params;

  try {
    const { rows } = await pool.query(adminQueries.getUserRole, [userId]);

    if (!rows[0]) {
      return res.status(404).json({ message: "User not found" });
    }

    if (rows[0].role === "admin") {
      return res.status(403).json({ message: "Admins cannot modify this data" });
    }

    next();
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    })
  }
}