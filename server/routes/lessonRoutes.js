const express = require('express');
const router = express.Router();
const { getLesson, getLessons } = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getLessons);
router.get('/:id', getLesson);

module.exports = router;