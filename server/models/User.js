const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    loginId: {
      type: String,
      required: [true, 'Login ID is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: ['ADMIN', 'STUDENT', 'TEACHER'],
      default: 'STUDENT'
    },
    status: {
      type: String,
      enum: ['Active', 'Expired', 'Revoked'],
      default: 'Active'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    expiryDate: {
      type: Date
    },
    schoolName: {
      type: String
    },
    // Student specific
    admissionNumber: {
      type: String
    },
    section: {
      type: String
    },
    // Teacher specific
    employeeId: {
      type: String
    },
    subject: {
      type: String
    },
    // Common fields
    className: {
      type: String,
      default: null
    },
    group: {
      type: String,
      enum: ['Early Learners', 'Foundation', 'Intermediate', 'Advanced', null],
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: null
    },
    streak: {
      type: Number,
      default: 0
    },
    xp: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('User', userSchema);