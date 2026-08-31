const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

// @desc    Save/update progress for a lesson (Stateless - DB storage tracking disabled)
// @route   POST /api/progress
// @access  Private
const saveProgress = async (req, res) => {
  try {
    // Disabled DB progress writes to save storage overhead
    res.json({
      message: 'Stateless progress acknowledged (DB tracking disabled)',
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while processing progress' });
  }
};

// @desc    Get progress for a user
// @route   GET /api/progress/:userId
// @access  Private
const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Users can only view their own progress unless admin
    if (req.user.role !== 'ADMIN' && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const progress = await Progress.find({ userId })
      .populate('lessonId', 'title icon area areaIcon')
      .sort({ updatedAt: -1 });

    // Calculate skill percentages
    const areas = ['Spoken English', 'Vocabulary', 'Grammar', 'Listening', 'Reading'];
    const skillLevels = {};

    areas.forEach((area) => {
      const areaProgress = progress.filter(p => p.area === area && p.status === 'completed');
      const total = areaProgress.length;
      const completed = areaProgress.length;
      // For MVP, calculate based on completed lessons (max 5 lessons per area = 100%)
      const percentage = Math.min(Math.round((completed / 5) * 100), 100);
      skillLevels[area] = {
        completed: completed,
        percentage
      };
    });

    // Get user info
    const user = await User.findById(userId).select('-password');

    res.json({
      user: {
        name: user.name,
        className: user.className,
        group: user.group,
        streak: user.streak,
        xp: user.xp
      },
      progress,
      skillLevels
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching progress' });
  }
};

// @desc    Get user summary for dashboard
// @route   GET /api/progress/:userId/summary
// @access  Private
const getUserSummary = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.role !== 'ADMIN' && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const [progress, user] = await Promise.all([
      Progress.find({ userId }).populate('lessonId', 'title icon area'),
      User.findById(userId).select('-password')
    ]);

    const completedLessons = progress.filter(p => p.status === 'completed');
    const inProgressLessons = progress.filter(p => p.status === 'started');

    // Skill breakdown
    const skills = {
      'Spoken English': { completed: 0, total: 2, icon: '🗣' },
      'Reading': { completed: 0, total: 1, icon: '📖' },
      'Listening': { completed: 0, total: 1, icon: '🎧' },
      'Grammar': { completed: 0, total: 2, icon: '✍' }
    };

    completedLessons.forEach((p) => {
      if (p.area === 'Vocabulary') {
        skills['Spoken English'].completed += 0.5;
      }
      if (skills[p.area]) {
        skills[p.area].completed += 1;
      }
    });

    const skillPercentages = {};
    Object.entries(skills).forEach(([key, value]) => {
      skillPercentages[key] = Math.min(Math.round((value.completed / value.total) * 100), 100);
    });

    res.json({
      summary: {
        completedLessons: completedLessons.length,
        inProgressLessons: inProgressLessons.length,
        totalXp: user.xp,
        streak: user.streak,
        className: user.className,
        skillPercentages
      },
      recentActivity: completedLessons.slice(0, 5).map(p => ({
        lessonId: p.lessonId._id,
        title: p.lessonId.title,
        icon: p.lessonId.icon,
        area: p.area,
        score: p.score,
        completedAt: p.completedAt
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching summary' });
  }
};

module.exports = { saveProgress, getUserProgress, getUserSummary };