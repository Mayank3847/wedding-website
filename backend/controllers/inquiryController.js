const pool = require('../config/db');

// @POST /api/inquiries — Submit contact/inquiry form
const createInquiry = async (req, res) => {
  try {
    const { vendor_id, name, email, phone, event_date, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const user_id = req.user ? req.user.id : null;

    const result = await pool.query(
      `INSERT INTO inquiries (user_id, vendor_id, name, email, phone, event_date, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [user_id, vendor_id || null, name, email, phone || null, event_date || null, message]
    );

    res.status(201).json({
      message: 'Inquiry submitted successfully! We will get back to you soon.',
      inquiry: result.rows[0]
    });
  } catch (error) {
    console.error('Inquiry error:', error);
    res.status(500).json({ message: 'Error submitting inquiry' });
  }
};

// @GET /api/inquiries/my — Get user's own inquiries
const getMyInquiries = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, v.name as vendor_name
       FROM inquiries i
       LEFT JOIN vendors v ON i.vendor_id = v.id
       WHERE i.user_id = $1
       ORDER BY i.created_at DESC`,
      [req.user.id]
    );

    res.json({ inquiries: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries' });
  }
};

module.exports = { createInquiry, getMyInquiries };