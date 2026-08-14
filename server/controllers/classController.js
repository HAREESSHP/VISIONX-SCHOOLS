const Class = require('../models/Class');
const Lesson = require('../models/Lesson');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ level: 1 });

    // Group classes by learning group
    const grouped = {
      'Early Learners': [],
      'Foundation': [],
      'Intermediate': [],
      'Advanced': []
    };

    classes.forEach((cls) => {
      if (grouped[cls.group]) {
        grouped[cls.group].push({
          id: cls._id,
          name: cls.name,
          level: cls.level,
          group: cls.group,
          minAge: cls.minAge,
          maxAge: cls.maxAge
        });
      }
    });

    res.json({ classes, grouped });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching classes' });
  }
};

// @desc    Get lessons for a class by learning area
// @route   GET /api/classes/:id/lessons
// @access  Private
const getClassLessons = async (req, res) => {
  try {
    const classId = req.params.id;

    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const lessons = await Lesson.find({ classId, isPublished: true })
      .select('title description icon duration area areaIcon topic objectives order')
      .sort({ area: 1, order: 1 });

    // Group lessons by learning area
    const areas = [
      { name: 'Spoken English', icon: '🎤', description: 'Speak English with confidence', lessons: [] },
      { name: 'Vocabulary', icon: '📚', description: 'Learn new words every day', lessons: [] },
      { name: 'Grammar', icon: '✍️', description: 'Understand English grammar', lessons: [] },
      { name: 'Listening', icon: '🎧', description: 'Improve your listening skills', lessons: [] },
      { name: 'Reading', icon: '📖', description: 'Read stories and passages', lessons: [] }
    ];

    lessons.forEach((lesson) => {
      const area = areas.find(a => a.name === lesson.area);
      if (area) {
        area.lessons.push(lesson);
      }
    });

    res.json({
      class: classObj,
      areas: areas.filter(a => a.lessons.length > 0)
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid class ID' });
    }
    res.status(500).json({ message: 'Server error while fetching lessons' });
  }
};

module.exports = { getClasses, getClassLessons };