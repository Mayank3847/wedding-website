const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// @GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// @PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2 WHERE id = $3 RETURNING id, name, email, phone, role',
      [name, phone, req.user.id]
    );

    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// @POST /api/users/bookmarks/:vendorId
const toggleBookmark = async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Check if already bookmarked
    const existing = await pool.query(
      'SELECT id FROM bookmarks WHERE user_id = $1 AND vendor_id = $2',
      [req.user.id, vendorId]
    );

    if (existing.rows.length > 0) {
      // Remove bookmark
      await pool.query('DELETE FROM bookmarks WHERE user_id = $1 AND vendor_id = $2', [req.user.id, vendorId]);
      return res.json({ message: 'Bookmark removed', bookmarked: false });
    }

    // Add bookmark
    await pool.query(
      'INSERT INTO bookmarks (user_id, vendor_id) VALUES ($1, $2)',
      [req.user.id, vendorId]
    );

    res.json({ message: 'Vendor bookmarked', bookmarked: true });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling bookmark' });
  }
};

// @GET /api/users/bookmarks
const getBookmarks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT v.*, c.name as category_name
       FROM bookmarks b
       JOIN vendors v ON b.vendor_id = v.id
       LEFT JOIN categories c ON v.category_id = c.id
       WHERE b.user_id = $1`,
      [req.user.id]
    );

    res.json({ bookmarks: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
};

module.exports = { getProfile, updateProfile, toggleBookmark, getBookmarks };