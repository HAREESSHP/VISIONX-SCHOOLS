const express = require('express');
const router = express.Router();
const { getClasses, getClassLessons } = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getClasses);
router.get('/:id/lessons', getClassLessons);

module.exports = router;