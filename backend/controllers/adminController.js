
import pool from "../config/db.js";

export const getAdminData = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const usersResult = await pool.query(
      "SELECT id, email, role, created_at FROM users"
    );

    res.json({
      message: "Admin dashboard access granted",
      stats: {
        totalUsers: usersResult.rows.length,
        serverTime: new Date()
      },
      users: usersResult.rows
    });
  } catch (err) {
    console.error("Admin access error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
