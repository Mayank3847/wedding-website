const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, toggleBookmark, getBookmarks } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All user routes are protected

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/bookmarks', getBookmarks);
router.post('/bookmarks/:vendorId', toggleBookmark);

module.exports = router;