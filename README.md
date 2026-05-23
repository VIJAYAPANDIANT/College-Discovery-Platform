# 🎓 UniScope - College Discovery & Comparison Platform

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge" alt="Maintained">
  <img src="https://img.shields.io/github/license/VIJAYAPANDIANT/College-Discovery-Platform?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Next.js-16.x-blue?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.x-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/PostgreSQL-18.x-4479A1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
</div>

<p align="center">
  <strong>A premium, full-stack college search, discovery, and comparison platform helping students find and compare world-class universities.</strong>
  <br />
  <br />
  <a href="https://college-discovery-platform-mfqh.vercel.app/"><strong>Live Frontend Website »</strong></a>
  ·
  <a href="college-discovery-platform-nkvs-mp24sk12q.vercel.app"><strong>Live Backend API »</strong></a>
  ·
  <a href="http://localhost:3000">Local Site</a>
</p>

---

## 📋 Table of Contents
- [🔐 Demo Credentials](#-demo-credentials)
- [📝 Overview](#-overview)
- [🚀 Features](#-features)
  - [🔍 College Discovery](#-college-discovery)
  - [📊 Comparison Engine](#-comparison-engine)
  - [💬 Student Review System](#-student-review-system)
- [🔄 User Workflow](#-user-workflow)
- [🛠️ Technical Stack](#-technical-stack)
- [📂 Project Structure](#-project-structure)
- [🚦 Getting Started](#-getting-started)
- [⚙️ Advanced Features](#-advanced-features)
- [🗺️ Roadmap](#-roadmap)
- [👤 Contact](#-contact)

---

## 🔐 Demo Credentials

For testing purposes, the database contains 5 seeded test user accounts with pre-hashed credentials:

| Role          | Email                  | Password      |
| :------------ | :--------------------- | :------------ |
| **Test User** | `alex@uniscope.com`    | `password123` |
| **Test User** | `samantha@uniscope.com`| `password123` |
| **Test User** | `elena@uniscope.com`   | `password123` |
| **Test User** | `marcus@uniscope.com`  | `password123` |
| **Test User** | `david@uniscope.com`   | `password123` |

---

## 📝 Overview

**UniScope** is designed to simplify the college selection process by providing detailed profile information for **67+ top-tier global universities**. It allows students to filter institutions by region, type, and tuition fees, compare statistics side-by-side, read student reviews, and bookmark choices.

### Key Objectives:
- 🎓 **Information Rich:** Detailed college metrics including established year, average package, rank, and features.
- ⚡ **Side-by-Side Comparison:** Compare up to 3 colleges across multiple criteria instantly.
- 💬 **Authentic Feedback:** Structured review and rating system distributed among realistic alumni profiles.

---

## 🚀 Features

### 🔍 College Discovery
- **Comprehensive Profiles:** 67+ detailed world-class university profiles containing statistics, descriptions, courses, and ratings.
- **Advanced Filtering:** Filter by location, public/private status, ratings, and custom tuition fee ranges.
- **Dynamic Sorting:** Sort search results instantly by Rank, Rating, or Tuition Fees (ascending/descending).

### 📊 Comparison Engine
- **Multi-Selection:** Select and compare up to 3 colleges side-by-side.
- **Detailed Comparison Matrix:** Compare tuition fees, average placement packages, established years, placement rates, ratings, and website links in a single interactive view.

### 💬 Student Review System
- **Distributed Feedback:** Pre-populated review sets providing qualitative student insights.
- **Interactive Reviews:** Hashed user validation allows logged-in students to submit verified feedback.

---

## 🔄 User Workflow

1.  **Search & Discovery:** Browse the full grid of colleges or search by name, region, or description.
2.  **Filter & Sort:** Refine search results using the interactive sidebar metrics.
3.  **Inspect Profile:** Click on any university card to view detailed overview, list of courses, and reviews.
4.  **Compare:** Toggle checkboxes on multiple cards to view comparative statistics side-by-side.
5.  **Bookmark:** Save interesting universities to personal lists (stored and validated locally).

---

## 🛠️ Technical Stack

### Frontend & UI
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4A154B?style=for-the-badge&logoColor=white)

### Backend & Database
![Next.js API](https://img.shields.io/badge/Next.js_API-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 📂 Project Structure

```bash
College-Discovery-Platform/
├── database/           # Standalone Database Module
│   ├── prisma/         # Relational database schemas & seed script
│   └── lib/            # Prisma Client singleton instantiation
├── backend/            # Next.js API Server
│   ├── proxy.ts        # Next.js 16 Edge proxy for CORS headers
│   ├── prisma/         # Backend schema configuration
│   ├── services/       # Core business logic layer
│   └── app/api/        # REST API router
├── frontend/           # Next.js React Client
│   ├── app/            # Main application pages (Colleges, Compare, Privacy, Terms, Contact)
│   ├── components/     # Reusable UI cards, tables, search panels
│   └── lib/            # Local data mocks and client logic
└── README.md           # Project documentation
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18.x or newer)
- PostgreSQL (v18.x active and listening on port `5432` with username `postgres`)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VIJAYAPANDIANT/College-Discovery-Platform.git
   cd College-Discovery-Platform
   ```

2. **Initialize Database Module:**
   Provide your local PostgreSQL password in `database/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/uniscope?schema=public"
   ```
   Deploy the schemas and seed data:
   ```bash
   cd database
   npm install
   npx prisma db push --force-reset
   npm run db:seed
   ```

3. **Start Backend API Server:**
   Configure `backend/.env` with the same connection string:
   ```bash
   cd ../backend
   npm install
   npx prisma generate
   npm run dev
   ```

4. **Start Frontend Web Application:**
   Run the dev server using Webpack compiler mode:
   ```bash
   cd ../frontend
   npm install
   npm run dev -- --webpack
   ```
   Access the application at `http://localhost:3000`.

### 🌐 Deploying to Vercel

You can deploy both frontend and backend subprojects independently to Vercel:

1. **Frontend Deployment (`frontend/` as root):**
   - In your Vercel project settings, set the **Root Directory** to `frontend`.
   - Add the Environment Variable:
     - `NEXT_PUBLIC_API_URL` = `https://your-backend-vercel-url.app/api`

2. **Backend Deployment (`backend/` as root):**
   - In your Vercel project settings, set the **Root Directory** to `backend`.
   - Add the Environment Variable:
     - `DATABASE_URL` = `postgresql://username:password@hostname:port/db_name?schema=public` *(Your hosted cloud PostgreSQL database connection string)*

---

## ⚙️ Advanced Features

- **Unified Schema Design**: Schema models are fully compatible with both the database module specification and the Next.js API requirements.
- **Client Cache-Busting**: The frontend includes automatic cache-busting triggers to ensure local storage databases stay updated with fixed Unsplash image links.
- **Automatic Postgres recovery**: Decrypted saved configuration profiles to safely connect to local PostgreSQL servers.

---

## 🗺️ Roadmap

- [ ] **AI Counselor**: Chat assistant providing personalized university recommendations.
- [ ] **Interactive Maps**: Geographic campus visualization and neighborhood discovery.
- [ ] **Direct Applications**: Send applications directly to university enrollment registries.
- [ ] **Digital Portfolio**: Create profiles to auto-fill registration forms.

---

## 👤 Contact

Created by **Vijayapandian T**

- **LinkedIn:** [vijayapandian-t](http://www.linkedin.com/in/vijayapandian-t)
- **GitHub:** [@VIJAYAPANDIANT](https://github.com/VIJAYAPANDIANT)
- **Email:** [vijayapandian112007@gmail.com](mailto:vijayapandian112007@gmail.com)

---
<div align="center">
  <p>If you like this project, please give it a ⭐!</p>
</div>
