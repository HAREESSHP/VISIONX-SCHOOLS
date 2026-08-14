const express = require('express');
const router = express.Router();
const {
  saveProgress,
  getUserProgress,
  getUserSummary
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', saveProgress);
router.get('/:userId', getUserProgress);
router.get('/:userId/summary', getUserSummary);

module.exports = router;