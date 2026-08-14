const Lesson = require('../models/Lesson');

// @desc    Get a single lesson by ID
// @route   GET /api/lessons/:id
// @access  Private
const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (!lesson.isPublished) {
      return res.status(404).json({ message: 'Lesson not available' });
    }

    res.json({ lesson });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid lesson ID' });
    }
    res.status(500).json({ message: 'Server error while fetching lesson' });
  }
};

// @desc    Get all lessons (for admin content management - future)
// @route   GET /api/lessons
// @access  Private
const getLessons = async (req, res) => {
  try {
    const { className, area } = req.query;
    const filter = {};

    if (className) filter.className = className;
    if (area) filter.area = area;

    const lessons = await Lesson.find(filter)
      .sort({ className: 1, area: 1, order: 1 });

    res.json({ lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching lessons' });
  }
};

module.exports = { getLesson, getLessons };