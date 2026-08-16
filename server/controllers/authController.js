const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ message: 'Login ID and password are required' });
    }

    const user = await User.findOne({ loginId: loginId.toUpperCase().trim() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid login ID or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid login ID or password' });
    }

    if (!user.isActive || user.status === 'Revoked') {
      return res.status(403).json({ message: 'This account has been disabled or revoked. Please contact your administrator.' });
    }

    if (user.status === 'Expired') {
      return res.status(403).json({ message: 'Your account has expired.' });
    }

    if (user.expiryDate && new Date() > new Date(user.expiryDate)) {
      user.status = 'Expired';
      await user.save();
      return res.status(403).json({ message: 'Your account has expired.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        loginId: user.loginId,
        role: user.role,
        className: user.className,
        group: user.group,
        streak: user.streak,
        xp: user.xp
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Login admin
// @route   POST /api/auth/admin-login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ message: 'Login ID and password are required' });
    }

    const user = await User.findOne({ loginId: loginId.toUpperCase().trim() });

    if (!user || user.role !== 'ADMIN') {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'This account has been disabled. Please contact your administrator.' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        loginId: user.loginId,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user class selection
// @route   PATCH /api/auth/me/class
// @access  Private
const updateUserClass = async (req, res) => {
  try {
    const { className, group } = req.body;

    if (!className) {
      return res.status(400).json({ message: 'Class name is required' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.className = className;
    if (group) {
      user.group = group;
    }

    await user.save();

    res.json({
      user: {
        id: user._id,
        name: user.name,
        loginId: user.loginId,
        role: user.role,
        className: user.className,
        group: user.group,
        streak: user.streak,
        xp: user.xp
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating class' });
  }
};

module.exports = { loginUser, loginAdmin, getMe, updateUserClass };