# College Discovery Platform (UniScope)

A modern collegiate search and discovery web application that allows students to browse world-class universities, compare tuition fees, ratings, placement rates, and view authentic student reviews.

## 📂 Project Architecture

The project is structured into three main directories:

1. **`database/`**: Relational PostgreSQL database module using Prisma ORM. Houses the schema definitions, baseline migrations, and the custom seeder supporting 67 universities.
2. **`backend/`**: Next.js API server exposing endpoints for colleges, reviews, comparisons, and user bookmarks.
3. **`frontend/`**: Interactive, responsive Webpack-based React/Next.js frontend user interface built with custom styling.

## 🚀 Setup & Execution

### 1. Database Setup
Ensure PostgreSQL is running locally and credentials are configured in `database/.env`, then run:
```bash
cd database
npm install
npx prisma db push
npm run db:seed
```

### 2. Backend API Setup
Configure `backend/.env` with the same database URL, then run:
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### 3. Frontend UI Setup
Start the Next.js frontend development server:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:3000`.
