const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
      index: true
    },
    className: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Lesson description is required']
    },
    icon: {
      type: String,
      default: '📘'
    },
    duration: {
      type: String,
      default: '10 min'
    },
    area: {
      type: String,
      required: true,
      enum: ['Spoken English', 'Vocabulary', 'Grammar', 'Listening', 'Reading']
    },
    areaIcon: {
      type: String,
      default: '📘'
    },
    topic: {
      type: String,
      default: ''
    },
    objectives: {
      type: [String],
      default: []
    },
    content: {
      introduction: String,
      learn: [
        {
          word: String,
          pronunciation: String,
          meaning: String,
          example: String,
          emoji: String
        }
      ],
      listen: {
        text: String,
        questions: [
          {
            question: String,
            options: [String],
            answer: Number
          }
        ]
      },
      practice: String,
      speak: String
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    order: {
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

// Compound index for class + area
lessonSchema.index({ classId: 1, area: 1, order: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);