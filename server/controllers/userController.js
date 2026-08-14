const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { loginId: { $regex: search, $options: 'i' } },
            { className: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter)
    ]);

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Admin
const createUser = async (req, res) => {
  try {
    const { name, loginId, password, className, group } = req.body;

    // Validation
    if (!name || !loginId || !password) {
      return res.status(400).json({ message: 'Name, Login ID, and Password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check for duplicate loginId
    const existingUser = await User.findOne({ loginId: loginId.toUpperCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: `Login ID "${loginId.toUpperCase().trim()}" already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      loginId: loginId.toUpperCase().trim(),
      password: hashedPassword,
      role: 'USER',
      className: className || null,
      group: group || null
    });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        loginId: user.loginId,
        role: user.role,
        className: user.className,
        group: user.group,
        isActive: user.isActive
      }
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Login ID already exists' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error while creating user' });
  }
};

// @desc    Update a user
// @route   PATCH /api/users/:id
// @access  Admin
const updateUser = async (req, res) => {
  try {
    const { name, className, group, isActive, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name.trim();
    if (className !== undefined) user.className = className;
    if (group !== undefined) user.group = group;
    if (isActive !== undefined) user.isActive = isActive;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        loginId: user.loginId,
        role: user.role,
        className: user.className,
        group: user.group,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating user' });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting the admin account
    if (user.role === 'ADMIN') {
      return res.status(400).json({ message: 'Cannot delete admin account' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};

// @desc    Toggle user active status
// @route   PATCH /api/users/:id/toggle
// @access  Admin
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'ADMIN') {
      return res.status(400).json({ message: 'Cannot disable admin account' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: user.isActive ? 'User enabled successfully' : 'User disabled successfully',
      user: {
        id: user._id,
        name: user.name,
        loginId: user.loginId,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while toggling user status' });
  }
};

// @desc    Reset user password
// @route   POST /api/users/:id/reset-password
// @access  Admin
const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: `Password reset successfully for ${user.name}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while resetting password' });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, toggleUserStatus, resetPassword };