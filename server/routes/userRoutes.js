const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  resetPassword
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All user management routes are admin-only
router.use(protect);
router.use(adminOnly);

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.patch('/:id/toggle', toggleUserStatus);
router.post('/:id/reset-password', resetPassword);
router.delete('/:id', deleteUser);

module.exports = router;