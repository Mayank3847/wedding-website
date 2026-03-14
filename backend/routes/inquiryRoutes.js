const express = require('express');
const router = express.Router();
const { createInquiry, getMyInquiries } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createInquiry);          // Anyone can submit
router.get('/my', protect, getMyInquiries); // Only logged in user

module.exports = router;