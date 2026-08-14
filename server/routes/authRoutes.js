const express = require('express');
const router = express.Router();
const {
  loginUser,
  loginAdmin,
  getMe,
  updateUserClass
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);

// Protected routes
router.get('/me', protect, getMe);
router.patch('/me/class', protect, updateUserClass);

module.exports = router;