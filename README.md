# 💒 Vivah Studio — Premium Wedding Services Platform

> A modern, full-stack wedding services marketplace that connects couples with verified photographers, venues, caterers, decorators and more across India.

<div align="center">

![Vivah Studio](https://img.shields.io/badge/Vivah%20Studio-Wedding%20Platform-4a7c59?style=for-the-badge&logo=heart&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🎨 **Frontend** | [https://wedding-website-one-ochre.vercel.app](https://wedding-website-one-ochre.vercel.app) |
| ⚙️ **Backend API** | [https://wedding-website-api-zawh.onrender.com](https://wedding-website-api-zawh.onrender.com) |
| 📦 **GitHub Repo** | [https://github.com/Mayank3847/wedding-website](https://github.com/Mayank3847/wedding-website) |

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Author](#author)

---

## 📖 About the Project

**Vivah Studio** is a full-stack wedding services marketplace inspired by [The Weddings Chapter](https://www.theweddingschapter.com). This project was built as part of the **AppDost Complete IT Solution Pvt. Ltd. Full Stack Internship Assignment**.

The platform allows couples to:
- Browse and discover 44+ verified wedding vendors across 8 categories
- Search and filter vendors by category, city and budget
- Send direct inquiries to vendors without any middlemen
- Save favourite vendors to a personal dashboard
- Track all inquiry history in one place

> ⚡ **Assignment Note:** This is an *inspired* implementation — not a copy. The UI, layout, colour palette (sage green + ivory), component structure, and feature set are all original.

---

## ✨ Features

### 👤 User Authentication
- Secure **JWT-based** signup and login
- Password hashing with **bcryptjs**
- Protected routes and persistent sessions
- Auto-login after signup

### 🏠 Home Page
- Animated hero section with cycling headline words
- Stats counter with animated numbers
- Horizontal scroll services carousel with real photos
- "Why Us" feature section
- Featured vendors grid (pulled live from database)
- Interactive testimonials with expand/collapse
- Final CTA banner

### 🔍 Vendor / Service Listing
- **44 vendors** across 8 categories with real data
- Search by name or description
- Filter by category (Photography, Venue, Catering, Decoration, Music & DJ, Bridal Wear, Makeup Artist, Videography)
- Filter by city/location
- Responsive card grid (1 → 6 columns based on screen size)

### 📄 Vendor Details Page
- Full vendor profile with photo, description, rating
- Price range and location info
- Direct inquiry form on the detail page
- Save/bookmark vendor with heart button

### 📬 Contact / Inquiry Form
- General contact form (no login required)
- Vendor-specific inquiry form on vendor pages
- Event date picker
- All inquiries stored in PostgreSQL database

### 📊 User Dashboard
- Protected route (redirects to login if not authenticated)
- Stats cards: saved vendors, inquiries sent, replied, pending
- Saved vendors grid with quick access
- Full inquiry history with status tracking (pending → replied → closed)
- Logout functionality

### 📱 Fully Responsive
- Mobile-first design (works from 320px to 4K)
- Hamburger menu on mobile
- Touch-optimised interactions
- Proper viewport meta tag for all devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js 18** | UI framework |
| **TanStack Router** | File-based routing |
| **Tailwind CSS** | Utility-first styling |
| **TanStack Query** | Server state management & caching |
| **Axios** | HTTP client |
| **React Hook Form** | Form handling & validation |
| **React Hot Toast** | Notification toasts |
| **Framer Motion / CSS** | Animations |
| **React Intersection Observer** | Scroll-triggered animations |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 18+** | JavaScript runtime |
| **Express.js** | Web framework |
| **PostgreSQL** | Relational database |
| **pg (node-postgres)** | PostgreSQL client |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT authentication |
| **dotenv** | Environment variables |
| **cors** | Cross-origin resource sharing |
| **nodemon** | Dev auto-restart |

### Database & Deployment
| Service | Purpose |
|---------|---------|
| **Neon** | Hosted PostgreSQL (free tier) |
| **Render** | Backend hosting (free tier) |
| **Vercel** | Frontend hosting |

---

## 📁 Project Structure

```
wedding-website/
├── frontend/                    # React.js frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── auth.js          # All API call functions
│   │   ├── components/
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Stats.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── WhyUs.jsx
│   │   │   │   └── Testimonials.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── vendors/
│   │   │       └── VendorCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── routes/
│   │   │   ├── __root.jsx
│   │   │   ├── index.jsx        # Home page
│   │   │   ├── vendors.jsx      # Vendor listing
│   │   │   ├── vendors/
│   │   │   │   └── $vendorId.jsx # Vendor detail
│   │   │   ├── services.jsx     # Services page
│   │   │   ├── contact.jsx
│   │   │   ├── login.jsx
│   │   │   ├── signup.jsx
│   │   │   └── dashboard.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                     # Node.js + Express backend
    ├── config/
    │   └── db.js                # PostgreSQL connection pool
    ├── controllers/
    │   ├── authController.js
    │   ├── vendorController.js
    │   ├── inquiryController.js
    │   └── userController.js
    ├── middleware/
    │   ├── authMiddleware.js    # JWT protect + adminOnly
    │   └── errorMiddleware.js
    ├── models/
    │   └── schema.sql           # Full DB schema + seed data
    ├── routes/
    │   ├── authRoutes.js
    │   ├── vendorRoutes.js
    │   ├── inquiryRoutes.js
    │   └── userRoutes.js
    ├── server.js
    ├── .env                     # (not committed)
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node --version   # v18 or higher
npm --version    # v9 or higher
```

You also need **PostgreSQL** installed locally or a [Neon](https://neon.tech) account.

---

### 1. Clone the Repository

```bash
git clone https://github.com/Mayank3847/wedding-website.git
cd wedding-website
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/wedding_db
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Setup the database:

```bash
# Open PostgreSQL and run:
psql -U postgres -c "CREATE DATABASE wedding_db;"
psql -U postgres -d wedding_db -f models/schema.sql
```

Start the backend:

```bash
npm run dev
# Server runs on http://localhost:5000
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Vivah Studio
```

Start the frontend:

```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiry | `7d` |
| `NODE_ENV` | Environment | `development` / `production` |
| `FRONTEND_URL` | Allowed CORS origin | `https://your-app.vercel.app` |

### Frontend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | App display name | `Vivah Studio` |

> **Note:** Vite automatically uses `.env` for local dev and Vercel environment variables for production builds.

---

## 📡 API Endpoints

### Auth Routes `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login and get JWT token |
| GET | `/api/auth/me` | ✅ | Get current user info |

### Vendor Routes `/api/vendors`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/vendors` | ❌ | Get all vendors (supports `?search=`, `?category=`, `?location=`, `?featured=true`, `?page=`, `?limit=`) |
| GET | `/api/vendors/categories` | ❌ | Get all 8 categories |
| GET | `/api/vendors/:id` | ❌ | Get single vendor by ID |

### Inquiry Routes `/api/inquiries`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/inquiries` | ❌ | Submit an inquiry (contact form) |
| GET | `/api/inquiries/my` | ✅ | Get logged-in user's inquiries |

### User Routes `/api/users`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/profile` | ✅ | Get user profile |
| PUT | `/api/users/profile` | ✅ | Update user profile |
| GET | `/api/users/bookmarks` | ✅ | Get saved vendors |
| POST | `/api/users/bookmarks/:vendorId` | ✅ | Toggle save/unsave vendor |

---

## 🗄️ Database Schema

```sql
users        — id, name, email, password, phone, role, created_at
categories   — id, name, icon, description, created_at
vendors      — id, name, category_id, description, location,
               price_range, rating, reviews_count, image_url,
               contact_email, contact_phone, is_featured, created_at
inquiries    — id, user_id, vendor_id, name, email, phone,
               event_date, message, status, created_at
bookmarks    — id, user_id, vendor_id, created_at (UNIQUE constraint)
```

**Seed Data:**
- 8 service categories
- 44 vendors (5–6 per category) with real descriptions, prices and locations

---

## ☁️ Deployment

### Database — Neon (Free PostgreSQL)
1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Run `schema.sql` in Neon SQL Editor
4. Seed all vendor data

### Backend — Render
1. Connect GitHub repo at [render.com](https://render.com)
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add all environment variables from the table above

### Frontend — Vercel
1. Import GitHub repo at [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Framework: Vite
4. Add `VITE_API_URL=https://your-render-url.onrender.com/api`



## 👨‍💻 Author

**Mayank Shekhar**

[![Gmail](https://img.shields.io/badge/Gmail-mayankshekhar0303%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mayankshekhar0303@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mayank%20Shekhar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayank-shekhar-44a81328a)
[![GitHub](https://img.shields.io/badge/GitHub-Mayank3847-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mayank3847)



## 📄 License

This project was built for internship assignment purposes.

---

<div align="center">

Made with ❤️ in India by **Mayank Shekhar**

⭐ Star this repo if you found it helpful!

</div>
