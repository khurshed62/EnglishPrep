English Prep IELTS Learning Platform - Backend API

A complete Node.js + Express + TypeScript backend server for the English Prep IELTS preparation platform.

## Features

- **Express + TypeScript**: Modern, type-safe REST API architecture.
- **SQLite Database (`better-sqlite3`)**: Zero-configuration local database with automatic schema migrations and indexing.
- **JWT Authentication**: Secure registration, login, and token refresh using `jsonwebtoken` and `bcryptjs`.
- **Pre-Seeded IELTS Tests**: 48 full IELTS tests (12 per skill: Reading 79–90, Listening 79–90, Writing 79–90, Speaking 79–90).
- **Pre-Seeded CEFR Lessons**: 30 interactive lessons spanning levels A1 through C2 (5 lessons per level) with grammar rules, vocabulary, and exercises.
- **Scoring & Analytics**: Automated band score calculation (0–9 scale), CEFR level mapping, time-series progress charts, and skill breakdowns.
- **CORS Configured**: Pre-configured for Vite frontend running on `http://localhost:5173`.

---

## Directory Structure

```
backend/
├── src/
│   ├── index.ts           # Express server entry (port 3001)
│   ├── routes/
│   │   ├── auth.ts        # POST /api/auth/register, /login, /refresh
│   │   ├── user.ts        # GET/PUT /api/user/profile, DELETE /api/user/account
│   │   ├── tests.ts       # GET /api/tests, GET /api/tests/:id, POST /api/tests/:id/submit, GET /api/tests/results
│   │   ├── lessons.ts     # GET /api/lessons, GET /api/lessons/:id, POST /api/lessons/:id/complete
│   │   └── stats.ts       # GET /api/stats/overview, /api/stats/progress
│   ├── middleware/
│   │   └── auth.ts        # JWT verification middleware
│   ├── db/
│   │   └── setup.ts       # SQLite database init + tables + automatic seeds
│   ├── utils/
│   │   └── jwt.ts         # Token generation and verification
│   ├── types/
│   │   └── index.ts       # TypeScript interfaces and types
│   └── data/
│       ├── seedTests.ts   # 48 IELTS tests (Reading, Listening, Writing, Speaking 79-90)
│       └── seedLessons.ts # 30 Lessons (A1 - C2)
├── tsconfig.json
├── package.json
└── .env
```

---

## Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
npm start
```

---

## Pre-Configured Demo Account

For testing, a demo account is automatically seeded upon first startup:
- **Email**: `demo@EnglishPrep.com`
- **Password**: `demo123456`

---

## API Documentation

### Health Check
- `GET /api/health` — Check server status and uptime.

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Create a new student account.
  - Body: `{ name, email, password, phone?, target_band?, study_hours_per_day?, ielts_date?, language? }`
- `POST /api/auth/login` — Sign in with email and password.
  - Body: `{ email, password }`
- `POST /api/auth/refresh` — Refresh expired access token.
  - Body: `{ refreshToken }`

### User Profile (`/api/user`) — *Requires Authorization: Bearer `<token>`*
- `GET /api/user/profile` — Get authenticated user's profile.
- `PUT /api/user/profile` — Update user profile details.
  - Body: `{ name, phone, target_band, study_hours_per_day, ielts_date, email_notifications, language }`
- `DELETE /api/user/account` — Delete user account and all associated test & lesson history.

### Tests (`/api/tests`)
- `GET /api/tests` — List all available tests.
  - Query parameter: `?skill=reading|listening|writing|speaking`
- `GET /api/tests/:id` — Get full test details with sections, passages, and questions.
- `POST /api/tests/:id/submit` — *Requires Auth* — Submit answers and calculate band score.
  - Body: `{ answers: Record<string, string> }`
- `GET /api/tests/results` — *Requires Auth* — Get user's test history.

### Lessons (`/api/lessons`)
- `GET /api/lessons` — List lessons.
  - Query parameter: `?level=a1|a2|b1|b2|c1|c2`
  - When authenticated, includes `completed: boolean` status.
- `GET /api/lessons/:id` — Get lesson content, grammar rules, vocabulary, and practice questions.
- `POST /api/lessons/:id/complete` — *Requires Auth* — Mark lesson as completed with score.
  - Body: `{ score?: number }`

### Statistics & Analytics (`/api/stats`) — *Requires Authorization: Bearer `<token>`*
- `GET /api/stats/overview` — Returns `{ testsCompleted, averageScore, lessonsCompleted, currentLevel, skillScores }`.
- `GET /api/stats/progress` — Returns time-series data for chart visualization.
