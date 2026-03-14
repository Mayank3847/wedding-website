const express = require('express');
const router = express.Router();
const { getAllVendors, getVendorById, getCategories } = require('../controllers/vendorController');

router.get('/', getAllVendors);
router.get('/categories', getCategories);
router.get('/:id', getVendorById);

module.exports = router;