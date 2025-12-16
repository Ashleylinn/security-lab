import pool from "../config/db.js";

export async function getPublicLabs(req, res) {
  const result = await pool.query(
    `SELECT id, title, summary, tag, created_at
     FROM lab_entries
     WHERE is_public = true
     ORDER BY created_at DESC`
  );

  res.json(result.rows);
}

export async function getAllLabs(req, res) {
  const result = await pool.query(
    `SELECT * FROM lab_entries ORDER BY created_at DESC`
  );

  res.json(result.rows);
}

export async function createLab(req, res) {
  const { title, summary, tag, is_public } = req.body;

  if (!title || !summary) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  await pool.query(
    `INSERT INTO lab_entries (title, summary, tag, is_public)
     VALUES ($1, $2, $3, $4)`,
    [title, summary, tag, is_public]
  );

  res.status(201).json({ message: "Lab entry created" });
}

export const getLabContent = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, summary, tag, created_at
       FROM lab_entries
       WHERE is_public = true
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("getLabContent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
