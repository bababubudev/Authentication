import pool from "../db/dbPool.js";
import { adminQueries } from "../db/query.js";

export const adminController = {
  async getUsers(req, res) {
    try {
      const { rows } = await pool.query(adminQueries.getAllUsers);
      res.status(200).json({
        message: "Users fetched successfully",
        data: rows
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
        error: err.message
      });
    }
  },

  async updateUserStatus(req, res) {
    const { userId, isActive } = req.body;

    try {
      const { rows } = await pool.query(
        adminQueries.updateUserStatus,
        [isActive, userId]
      );

      if (!rows[0]) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User status updated successfully",
        data: rows[0]
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
        error: err.message
      });
    }
  },

  async getUserAuditLog(req, res) {
    const { userId } = req.params;
    try {
      const { rows } = await pool.query(
        adminQueries.getUserAuditLog,
        [userId]
      );

      res.status(200).json({
        message: "User audit log retrieved",
        data: rows
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}