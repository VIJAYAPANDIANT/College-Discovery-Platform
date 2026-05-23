🎓 UniScope - College Discovery Platform
Status Maintained License Node.js React Next.js Vercel

A state-of-the-art, full-stack collegiate platform enabling students to search, compare, bookmark, and review universities worldwide.

Explore the Docs · Report Bug

📋 Table of Contents
🔐 Demo Credentials
📝 Overview
🚀 Features
👨🎓 Student Portal
🏢 College Directory
🔧 Administrator Dashboard
🔄 User Workflow
🛠️ Technical Stack
📂 Project Structure
🚦 Getting Started
⚙️ Advanced Features
🗺️ Roadmap
👤 Contact

🔐 Demo Credentials
For testing purposes, you can use the following credentials to access the user portal and bookmark/review features:

Role	Email	Password
Test User 1	alex@uniscope.com	password123
Test User 2	samantha@uniscope.com	password123
Test User 3	elena@uniscope.com	password123
Test User 4	marcus@uniscope.com	password123
Test User 5	david@uniscope.com	password123

📝 Overview
UniScope is designed to simplify and enhance the process of choosing the perfect higher education institution. By combining an intuitive, modern user interface with a robust, relational PostgreSQL database, it allows students to seamlessly filter colleges, compare academic statistics side-by-side, read student reviews, and manage bookmarked schools.

Key Objectives:
📊 Side-by-Side Comparison: Compare up to 3 colleges simultaneously across tuition fees, rankings, and placements.
🎓 Student Reviews: Read authentic comments, ratings, and feedback shared by verified alumni.
⚡ Performance & Cache: Webpack-powered frontend compiler with local storage database synchronization for zero-latency operations.
💼 Career Insights: Explore graduation statistics, placement rates, and average salaries per campus.

🚀 Features

👨🎓 Student Portal
* **Personalized Dashboard**: Track bookmarked colleges and view submitted reviews.
* **Responsive Comparison Drawer**: Dock selected universities at the bottom of the screen and trigger a dynamic comparison overlay with one click.
* **Zustand State Management**: Smooth, instantaneous client-side updates for saves and reviews.

🏢 College Directory
* **Multi-Criteria Filtering**: Filter by location, public/private status, annual tuition fees, and minimum user rating.
* **Instant Search**: Search through 67 world-class universities in real-time.
* **Detailed Campus Profiles**: In-depth overviews, lists of offered degrees, and statistics on student placement.

🔧 Administrator Dashboard
* **Content Management**: Database models supporting complete CRUD operations for colleges, courses, and reviews.
* **Relational Database Integrations**: Robust foreign key constraints and cascade rules automatically cleaning reviews and courses on college updates.

🔄 User Workflow
1. **Authentication**: Log in with secure credentials to personalize your profile.
2. **Browse & Search**: Filter colleges by location, tuition range, type, or ratings.
3. **Compare**: Add up to 3 colleges to the Comparison Drawer to evaluate academic performance side-by-side.
4. **Alumni Insights**: Read student reviews and check graduation packages.
5. **Bookmark**: Save colleges to your personal board for easy access.

🛠️ Technical Stack

Frontend & UI
* Next.js 16.2.6 (Webpack Compilation)
* React 19
* TailwindCSS
* Zustand (State Management)
* Lucide React (Icons)

Backend & Database
* Next.js API Routes (Turbopack Runner)
* Node.js
* PostgreSQL 18
* Prisma ORM (Relational Mapping)

📂 Project Structure
College-Discovery-Platform/
├── database/           # Relational Database Module
│   ├── prisma/
│   │   ├── schema.prisma # PostgreSQL unified schema (Merged db/backend)
│   │   ├── seed.ts       # Seeder script loading 67 detailed colleges
│   │   └── migrations/   # DDL SQL migration scripts
│   ├── lib/              # Prisma client initialization
│   └── tsconfig.json     # Database compile settings
├── backend/            # Next.js API Services
│   ├── app/              # API Route Handlers (colleges, saved, compare, auth)
│   ├── lib/              # Shared logic & configs
│   ├── services/         # Business logic layer
│   └── prisma/           # Client schemas
├── frontend/           # Next.js React client
│   ├── app/              # Router pages (colleges, compare, saved, auth)
│   ├── components/       # CollegeCard, FilterPanel, Navbar, CompareDrawer
│   ├── store/            # Client state stores (Saved, Compare, Toast, Auth)
│   └── lib/              # api-client.ts cache-buster & mock data
└── README.md           # Project documentation

🚦 Getting Started

Prerequisites
* Node.js (v18+)
* PostgreSQL 18

Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/VIJAYAPANDIANT/College-Discovery-Platform.git
   cd College-Discovery-Platform
   ```
2. Setup the Database:
   ```bash
   cd database
   npm install
   # Create a .env file and set DATABASE_URL
   npx prisma db push --force-reset
   npm run db:seed
   ```
3. Launch the Backend API Server:
   ```bash
   cd ../backend
   npm install
   npx prisma generate
   npm run dev
   ```
4. Launch the Frontend UI Client:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *Frontend is accessible at http://localhost:3000.*

⚙️ Advanced Features
* **Cache-Busting Integration**: Frontend automatically overwrites browser local storage if data changes or outdated image references are detected.
* **Unified Database Schema**: Fully compatible schema supporting database requirements and backend server models side-by-side.
* **Bcrypt Hashing**: User authentication passwords secured using Bcrypt hashing with a cost factor of 10.

🗺️ Roadmap
* 🤖 AI College Recommender: Recommend colleges based on aptitude, fee limits, and locations.
* 💬 Real-Time Chat Assistant: Integrated support chatbot answering admissions questions.
* 🎓 Digital Scholarship Hub: Aggregated scholarship search engine for private/public schools.
* 📦 PDF Resource Hub: Download prospectus and fee brochures directly from the directory.

👤 Contact
Created by Vijayapandian T

* LinkedIn: [vijayapandian-t](https://www.linkedin.com/in/vijayapandian-t/)
* GitHub: [@VIJAYAPANDIANT](https://github.com/VIJAYAPANDIANT)
* Email: [vijayapandian112007@gmail.com](mailto:vijayapandian112007@gmail.com)

If you like this project, please give it a ⭐!
