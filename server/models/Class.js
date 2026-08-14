const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required'],
      unique: true,
      trim: true,
      index: true
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 12
    },
    group: {
      type: String,
      required: true,
      enum: ['Early Learners', 'Foundation', 'Intermediate', 'Advanced']
    },
    minAge: {
      type: Number,
      required: true
    },
    maxAge: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Class', classSchema);