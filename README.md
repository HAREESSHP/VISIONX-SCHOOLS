# English Learning Platform 🎓

An interactive digital platform for children (Nursery to Class 10) to improve Spoken English, communication, vocabulary, grammar, pronunciation, listening, reading, and writing.

## 🚀 Tech Stack

- **Frontend:** React (Vite) + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcrypt

## 📁 Project Structure

```
english-learning-platform/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages
│   │   ├── services/    # API services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── index.html
│
├── server/              # Express backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

## 🛠️ Setup

### 1. Install dependencies

```bash
npm run install-all
```

### 2. Configure environment

Create `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/english-learning-platform
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### 3. Run the application

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🔑 Default Admin Account

```
Login ID: admin
Password: admin123
```

> ⚠️ Never hard-code these credentials in production frontend.

## 📚 Default Student Accounts

| Name          | Login ID     | Password  | Class   |
| ------------- | ------------ | --------- | ------- |
| Rahul Kumar   | RAHUL001     | student123| Class 5 |
| Priya Sharma  | PRIYA001     | student123| Class 2 |
| Arjun Singh   | ARJUN001     | student123| Class 8 |

## 🧩 Core Features

### Student
- Login with simple Login ID + Password
- Class selection (Nursery → Class 10)
- Student dashboard with skills & progress
- Learning areas: Spoken English, Vocabulary, Grammar, Listening, Reading
- Lessons with activities
- Profile with progress

### Admin
- Admin dashboard
- Generate login IDs
- Create/disable users
- Search users
- View all students

## 🔌 API Endpoints

```
POST   /api/auth/login          - User login
POST   /api/auth/admin-login    - Admin login
GET    /api/auth/me             - Get current user

GET    /api/users               - List users (admin)
POST   /api/users               - Create user (admin)
PATCH  /api/users/:id           - Update user (admin)
DELETE /api/users/:id           - Delete user (admin)

GET    /api/classes             - List classes
GET    /api/classes/:id/lessons - Lessons for a class
GET    /api/lessons/:id         - Get lesson detail

POST   /api/progress            - Save progress
GET    /api/progress/:userId    - Get user progress

POST   /api/demo                - Book a demo
```

## 🎯 Learning Groups

| Group          | Classes           | Primary Focus                                        |
| -------------- | ----------------- | ---------------------------------------------------- |
| Early Learners | Nursery, LKG, UKG | Words, sounds, basic vocabulary, speaking            |
| Foundation     | 1–3               | Basic English, sentences, pronunciation, vocabulary  |
| Intermediate   | 4–6               | Grammar, conversation, reading, listening            |
| Advanced       | 7–10              | Fluency, communication, advanced grammar, confidence |

## 📚 Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)

---

© 2026 VISIONX SCHOOLS. All rights reserved.