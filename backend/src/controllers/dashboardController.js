import pool from "../db/dbPool.js";

export async function getUserData(req, res) {
  try {
    const userId = req.user;
    const user = await pool.query(
      "SELECT * FROM users WHERE id=$1",
      [userId]
    );

    const data = user.rows[0];
    res.status(200).json({ message: "User data fetched", data: data });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error :/");
  }
}