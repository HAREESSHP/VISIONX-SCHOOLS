const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes must be protected and restricted to admin role
router.use(protect);
router.use(adminOnly);

router.post('/generate-id', adminController.generateId);
router.get('/users', adminController.getUsers);
router.get('/analytics', adminController.getAnalytics);

router.put('/users/:id/revoke', adminController.revokeAccess);
router.put('/users/:id/reset-password', adminController.resetPassword);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
