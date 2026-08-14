const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true
    },
    className: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true,
      enum: ['Spoken English', 'Vocabulary', 'Grammar', 'Listening', 'Reading']
    },
    status: {
      type: String,
      enum: ['started', 'completed'],
      default: 'started'
    },
    score: {
      type: Number,
      default: 0
    },
    quizResults: [
      {
        questionIndex: Number,
        selectedAnswer: Number,
        correct: Boolean
      }
    ],
    completedAt: {
      type: Date,
      default: null
    },
    timeSpent: {
      type: Number,
      default: 0
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

// A user can only have one progress record per lesson
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);