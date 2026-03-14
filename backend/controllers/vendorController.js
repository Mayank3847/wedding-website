const pool = require('../config/db');

// @GET /api/vendors — Get all vendors with optional filters
const getAllVendors = async (req, res) => {
  try {
    const { category, location, search, featured, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT v.*, c.name as category_name, c.icon as category_icon
      FROM vendors v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND c.name ILIKE $${paramCount}`;
      params.push(`%${category}%`);
      paramCount++;
    }

    if (location) {
      query += ` AND v.location ILIKE $${paramCount}`;
      params.push(`%${location}%`);
      paramCount++;
    }

    if (search) {
      query += ` AND (v.name ILIKE $${paramCount} OR v.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (featured === 'true') {
      query += ` AND v.is_featured = true`;
    }

    // Count total
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM (${query}) as total`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Add pagination
    query += ` ORDER BY v.is_featured DESC, v.rating DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({
      vendors: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get vendors error:', error);
    res.status(500).json({ message: 'Error fetching vendors' });
  }
};

// @GET /api/vendors/:id — Get single vendor
const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT v.*, c.name as category_name, c.icon as category_icon
       FROM vendors v
       LEFT JOIN categories c ON v.category_id = c.id
       WHERE v.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ vendor: result.rows[0] });
  } catch (error) {
    console.error('Get vendor error:', error);
    res.status(500).json({ message: 'Error fetching vendor' });
  }
};

// @GET /api/vendors/categories — Get all categories
const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json({ categories: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

module.exports = { getAllVendors, getVendorById, getCategories };