const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api', apiLimiter);

// ===== Routes =====
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/demo', require('./routes/demoRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'English Learning Platform API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong on the server'
  });
});

// ===== Database Seeding =====
const User = require('./models/User');
const Class = require('./models/Class');
const Lesson = require('./models/Lesson');

const CLASSES = [
  { name: 'Nursery', level: 0, group: 'Early Learners', minAge: 3, maxAge: 4 },
  { name: 'LKG', level: 1, group: 'Early Learners', minAge: 4, maxAge: 5 },
  { name: 'UKG', level: 2, group: 'Early Learners', minAge: 5, maxAge: 6 },
  { name: 'Class 1', level: 3, group: 'Foundation', minAge: 6, maxAge: 7 },
  { name: 'Class 2', level: 4, group: 'Foundation', minAge: 7, maxAge: 8 },
  { name: 'Class 3', level: 5, group: 'Foundation', minAge: 8, maxAge: 9 },
  { name: 'Class 4', level: 6, group: 'Intermediate', minAge: 9, maxAge: 10 },
  { name: 'Class 5', level: 7, group: 'Intermediate', minAge: 10, maxAge: 11 },
  { name: 'Class 6', level: 8, group: 'Intermediate', minAge: 11, maxAge: 12 },
  { name: 'Class 7', level: 9, group: 'Advanced', minAge: 12, maxAge: 13 },
  { name: 'Class 8', level: 10, group: 'Advanced', minAge: 13, maxAge: 14 },
  { name: 'Class 9', level: 11, group: 'Advanced', minAge: 14, maxAge: 15 },
  { name: 'Class 10', level: 12, group: 'Advanced', minAge: 15, maxAge: 16 }
];

const LESSONS = {
  'Spoken English': [
    {
      title: 'Introduce Yourself',
      description: 'Learn how to introduce yourself in English',
      icon: '🎤',
      duration: '10 min',
      topic: 'Self Introduction',
      content: {
        introduction: 'Introducing yourself is the first step to speaking English. Let\'s learn how to say who you are!',
        learn: [
          { word: 'My name is', meaning: 'Used to tell someone your name', example: 'My name is Rahul.' },
          { word: 'I am', meaning: 'Used to describe yourself', example: 'I am 10 years old.' },
          { word: 'I study in', meaning: 'Used to tell your class/school', example: 'I study in Class 5.' }
        ],
        listen: {
          text: 'Hello! My name is Rahul. I am 10 years old. I study in Class 5.',
          questions: [
            { question: 'What is the boy\'s name?', options: ['Rohan', 'Rahul', 'Raj'], answer: 1 },
            { question: 'How old is he?', options: ['8 years', '10 years', '12 years'], answer: 1 }
          ]
        },
        practice: 'Say this out loud: "Hello! My name is ____. I am ____ years old."',
        speak: 'Record yourself saying: "My name is ______. I am ______ years old. I study in ______."'
      },
      objectives: ['Introduce yourself', 'Say your name', 'Say your age', 'Say your class']
    },
    {
      title: 'Greetings',
      description: 'Learn common greetings and responses',
      icon: '👋',
      duration: '8 min',
      topic: 'Daily Greetings',
      content: {
        introduction: 'Greetings help us start conversations. Let\'s learn how to greet people!',
        learn: [
          { word: 'Good morning', meaning: 'Said in the morning', example: 'Good morning, teacher!' },
          { word: 'Good afternoon', meaning: 'Said after noon', example: 'Good afternoon, friends!' },
          { word: 'How are you?', meaning: 'A friendly question', example: 'Hello! How are you?' }
        ],
        listen: {
          text: 'Good morning! How are you? I am fine, thank you!',
          questions: [
            { question: 'What time of day is it?', options: ['Morning', 'Afternoon', 'Night'], answer: 0 },
            { question: 'How is the person?', options: ['Sad', 'Fine', 'Angry'], answer: 1 }
          ]
        },
        practice: 'Greet someone in the morning: "Good morning! How are you?"',
        speak: 'Record yourself saying: "Good morning! How are you? I am fine, thank you!"'
      },
      objectives: ['Use greetings', 'Respond to greetings', 'Ask how someone is']
    }
  ],
  'Vocabulary': [
    {
      title: 'Animals',
      description: 'Learn the names of common animals',
      icon: '🦁',
      duration: '12 min',
      topic: 'Animal Names',
      content: {
        introduction: 'Animals are everywhere! Let\'s learn their English names.',
        learn: [
          { word: 'Elephant', pronunciation: 'EL-uh-funt', meaning: 'A very large animal with a trunk', example: 'The elephant is big.', emoji: '🐘' },
          { word: 'Tiger', pronunciation: 'TY-ger', meaning: 'A large wild cat with stripes', example: 'The tiger runs fast.', emoji: '🐅' },
          { word: 'Monkey', pronunciation: 'MUN-kee', meaning: 'An animal that climbs trees', example: 'The monkey eats bananas.', emoji: '🐒' }
        ],
        listen: {
          text: 'The elephant is big. The tiger runs fast. The monkey eats bananas.',
          questions: [
            { question: 'Which animal is big?', options: ['Tiger', 'Elephant', 'Monkey'], answer: 1 },
            { question: 'What does the monkey eat?', options: ['Apples', 'Bananas', 'Mangoes'], answer: 1 }
          ]
        },
        practice: 'Point to each animal and say its name: Elephant, Tiger, Monkey',
        speak: 'Record yourself saying: "The elephant is big. The tiger runs fast. The monkey eats bananas."'
      },
      objectives: ['Identify animals', 'Say animal names', 'Use animals in sentences']
    },
    {
      title: 'Fruits',
      description: 'Learn the names of common fruits',
      icon: '🍎',
      duration: '10 min',
      topic: 'Fruit Names',
      content: {
        introduction: 'Fruits are healthy and delicious. Let\'s learn their names!',
        learn: [
          { word: 'Apple', pronunciation: 'AP-ul', meaning: 'A round red or green fruit', example: 'I eat an apple.', emoji: '🍎' },
          { word: 'Banana', pronunciation: 'buh-NAN-uh', meaning: 'A long yellow fruit', example: 'The monkey eats a banana.', emoji: '🍌' },
          { word: 'Mango', pronunciation: 'MAN-goh', meaning: 'A sweet yellow fruit', example: 'Mango is my favourite fruit.', emoji: '🥭' }
        ],
        listen: {
          text: 'I eat an apple. The banana is yellow. Mango is sweet.',
          questions: [
            { question: 'Which fruit is yellow?', options: ['Apple', 'Banana', 'Mango'], answer: 1 },
            { question: 'Which fruit is my favourite?', options: ['Apple', 'Banana', 'Mango'], answer: 2 }
          ]
        },
        practice: 'Say each fruit name: Apple, Banana, Mango',
        speak: 'Record yourself saying: "I eat an apple. The banana is yellow. Mango is sweet."'
      },
      objectives: ['Identify fruits', 'Say fruit names', 'Use fruits in sentences']
    }
  ],
  'Grammar': [
    {
      title: 'Nouns',
      description: 'Learn about naming words',
      icon: '📝',
      duration: '12 min',
      topic: 'Parts of Speech',
      content: {
        introduction: 'A noun is a naming word. It names a person, place, animal, or thing.',
        learn: [
          { word: 'Person', meaning: 'Names a person', example: 'teacher, boy, girl, Rahul' },
          { word: 'Place', meaning: 'Names a place', example: 'school, park, home, Delhi' },
          { word: 'Thing', meaning: 'Names a thing', example: 'book, table, ball, pen' }
        ],
        listen: {
          text: 'The boy goes to school. The teacher reads a book. The ball is in the park.',
          questions: [
            { question: 'Which word names a person?', options: ['school', 'teacher', 'book'], answer: 1 },
            { question: 'Which word names a place?', options: ['park', 'ball', 'boy'], answer: 0 }
          ]
        },
        practice: 'Find the noun in: "The cat sits on the mat." (Answer: cat, mat)',
        speak: 'Say 3 nouns you can see around you right now.'
      },
      objectives: ['Understand nouns', 'Identify nouns', 'Use nouns in sentences']
    },
    {
      title: 'Verbs',
      description: 'Learn about action words',
      icon: '🏃',
      duration: '12 min',
      topic: 'Parts of Speech',
      content: {
        introduction: 'A verb is an action word. It tells what someone or something does.',
        learn: [
          { word: 'Run', meaning: 'To move fast on your feet', example: 'I run in the park.' },
          { word: 'Jump', meaning: 'To push yourself up', example: 'The frog can jump.' },
          { word: 'Read', meaning: 'To look at words', example: 'We read books.' }
        ],
        listen: {
          text: 'I run in the park. The frog can jump. We read books in class.',
          questions: [
            { question: 'What does the frog do?', options: ['Run', 'Jump', 'Read'], answer: 1 },
            { question: 'Where do we read?', options: ['Park', 'Class', 'Home'], answer: 1 }
          ]
        },
        practice: 'Act out these verbs: run, jump, read, eat, sleep',
        speak: 'Record yourself saying: "I run. I jump. I read. I eat. I sleep."'
      },
      objectives: ['Understand verbs', 'Identify verbs', 'Use action words']
    }
  ],
  'Listening': [
    {
      title: 'Listen and Understand',
      description: 'Practice listening to English sentences',
      icon: '🎧',
      duration: '8 min',
      topic: 'Comprehension',
      content: {
        introduction: 'Listening is important for learning English. Listen carefully and answer!',
        learn: [
          { word: 'Listen', meaning: 'To pay attention to sound', example: 'Listen to the teacher.' },
          { word: 'Understand', meaning: 'To know the meaning', example: 'I understand English.' }
        ],
        listen: {
          text: 'Good morning! How are you? I am fine, thank you.',
          questions: [
            { question: 'What did the speaker say?', options: ['Good afternoon', 'Good morning', 'Good night'], answer: 1 },
            { question: 'How are they?', options: ['Fine', 'Sad', 'Tired'], answer: 0 }
          ]
        },
        practice: 'Close your eyes and listen. What words can you hear?',
        speak: 'Repeat after the speaker: "Good morning! How are you?"'
      },
      objectives: ['Listen carefully', 'Understand spoken English', 'Answer questions']
    }
  ],
  'Reading': [
    {
      title: 'The Little Rabbit',
      description: 'Read a short story and answer questions',
      icon: '📖',
      duration: '15 min',
      topic: 'Reading Comprehension',
      content: {
        introduction: 'Let\'s read a story about a little rabbit. Read carefully!',
        learn: [
          { word: 'Little', meaning: 'Small', example: 'The little rabbit is cute.' },
          { word: 'Forest', meaning: 'A place with many trees', example: 'The rabbit lives in the forest.' }
        ],
        listen: {
          text: 'Once upon a time, a little rabbit lived in a forest. One day, the rabbit saw a big tree with red apples. The rabbit was happy and ate an apple.',
          questions: [
            { question: 'Where did the rabbit live?', options: ['A city', 'A forest', 'A house'], answer: 1 },
            { question: 'What did the rabbit see?', options: ['A tree', 'A house', 'A river'], answer: 0 },
            { question: 'What did the rabbit eat?', options: ['A banana', 'An apple', 'A mango'], answer: 1 }
          ]
        },
        practice: 'Read the story again and try to read it aloud.',
        speak: 'Record yourself reading the story about the little rabbit.'
      },
      objectives: ['Read a short story', 'Understand the story', 'Answer comprehension questions']
    }
  ]
};

const LEARNING_AREAS = [
  { name: 'Spoken English', icon: '🎤', description: 'Speak English with confidence' },
  { name: 'Vocabulary', icon: '📚', description: 'Learn new words every day' },
  { name: 'Grammar', icon: '✍️', description: 'Understand English grammar' },
  { name: 'Listening', icon: '🎧', description: 'Improve your listening skills' },
  { name: 'Reading', icon: '📖', description: 'Read stories and passages' }
];

async function seedDatabase() {
  try {
    // Seed classes
    const classCount = await Class.countDocuments();
    if (classCount === 0) {
      await Class.insertMany(CLASSES);
      console.log('✅ Seeded classes');
    }

    // Seed admin
    const adminExists = await User.findOne({ loginId: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Administrator',
        loginId: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
        className: 'Administrator'
      });
      console.log('✅ Seeded admin account');
    }

    // Seed students
    const studentSeeds = [
      { name: 'Rahul Kumar', loginId: 'RAHUL001', className: 'Class 5', group: 'Intermediate' },
      { name: 'Priya Sharma', loginId: 'PRIYA001', className: 'Class 2', group: 'Foundation' },
      { name: 'Arjun Singh', loginId: 'ARJUN001', className: 'Class 8', group: 'Advanced' }
    ];

    for (const seed of studentSeeds) {
      const exists = await User.findOne({ loginId: seed.loginId });
      if (!exists) {
        const hashedPassword = await bcrypt.hash('student123', 10);
        await User.create({
          name: seed.name,
          loginId: seed.loginId,
          password: hashedPassword,
          role: 'USER',
          className: seed.className,
          group: seed.group
        });
      }
    }
    console.log('✅ Seeded student accounts');

    // Seed lessons
    const lessonCount = await Lesson.countDocuments();
    if (lessonCount === 0) {
      const lessonsToInsert = [];
      for (const className of CLASSES.map(c => c.name)) {
        const classObj = await Class.findOne({ name: className });
        if (!classObj) continue;

        for (const [area, lessons] of Object.entries(LESSONS)) {
          const areaObj = LEARNING_AREAS.find(a => a.name === area);
          for (const lesson of lessons) {
            lessonsToInsert.push({
              classId: classObj._id,
              className,
              area: area,
              areaIcon: areaObj ? areaObj.icon : '📘',
              ...lesson
            });
          }
        }
      }
      await Lesson.insertMany(lessonsToInsert);
      console.log(`✅ Seeded ${lessonsToInsert.length} lessons`);
    }
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  }
}

// ===== Connect to MongoDB =====
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });