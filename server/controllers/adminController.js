const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Generate ID (Student or Teacher)
exports.generateId = async (req, res) => {
  try {
    const { 
      role, name, className, section, schoolName, 
      admissionNumber, employeeId, subject, validityMonths 
    } = req.body;

    let loginId = '';
    let password = '';

    if (role === 'STUDENT') {
      if (!admissionNumber) return res.status(400).json({ message: 'Admission number is required' });
      loginId = `vx-${admissionNumber}`;
      password = `vx@${admissionNumber}`;
    } else if (role === 'TEACHER') {
      if (!employeeId) return res.status(400).json({ message: 'Employee ID is required' });
      loginId = `vx-${employeeId}`;
      password = `vx@${employeeId}`;
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ loginId: new RegExp(`^${loginId}$`, 'i') });
    if (existingUser) {
      return res.status(400).json({ message: `ID ${loginId} already exists in the system` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Calculate Expiry Date
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + parseInt(validityMonths || 6));

    const newUser = await User.create({
      name,
      loginId,
      password: hashedPassword,
      role,
      schoolName,
      status: 'Active',
      startDate,
      expiryDate,
      ...(role === 'STUDENT' ? { className, section, admissionNumber } : {}),
      ...(role === 'TEACHER' ? { employeeId, subject } : {})
    });

    res.status(201).json({
      message: `${role} ID generated successfully`,
      credentials: {
        loginId,
        password,
        role: newUser.role,
        expiryDate: newUser.expiryDate
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users with filters and search
exports.getUsers = async (req, res) => {
  try {
    const { role, className, status, search, schoolName } = req.query;
    
    let query = {};
    if (role) query.role = role;
    else query.role = { $in: ['STUDENT', 'TEACHER'] }; // exclude admin
    
    if (className) query.className = className;
    if (status) query.status = status;
    if (schoolName) query.schoolName = schoolName;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { loginId: { $regex: search, $options: 'i' } },
        { schoolName: { $regex: search, $options: 'i' } },
        { className: { $regex: search, $options: 'i' } },
        { admissionNumber: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Revoke access
exports.revokeAccess = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      status: 'Revoked',
      isActive: false
    }, { new: true }).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Access revoked successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // Generate new random password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newPassword = '';
    for (let i = 0; i < 6; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ 
      message: 'Password reset successfully',
      newPassword 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'STUDENT' });
    const totalTeachers = await User.countDocuments({ role: 'TEACHER' });
    
    const activeUsers = await User.countDocuments({ role: { $ne: 'ADMIN' }, status: 'Active' });
    const expiredUsers = await User.countDocuments({ role: { $ne: 'ADMIN' }, status: 'Expired' });
    const revokedUsers = await User.countDocuments({ role: { $ne: 'ADMIN' }, status: 'Revoked' });
    
    // Future expansion: active users by class etc.
    
    res.json({
      totalStudents,
      totalTeachers,
      activeUsers,
      expiredUsers,
      revokedUsers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get distinct schools
exports.getSchools = async (req, res) => {
  try {
    const schools = await User.distinct('schoolName');
    res.json(schools.filter(Boolean)); // filter out null/empty
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
