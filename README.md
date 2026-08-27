# 🌿 Natural Mantra — Organic E-Commerce & CMS Platform
> **Tagline**: "जिएं प्रकृति के मंत्र के साथ" (*Live with the sacred mantra of nature*)

Natural Mantra is a production-ready, full-stack Indian organic and wellness e-commerce platform built with React, Vite, Express, and MongoDB.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite, React Router DOM v6, Tailwind CSS, Lucide Icons, `react-helmet-async` (SEO engine).
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT authentication, bcryptjs, CORS, express-validator.
- **Admin Panel**: Integrated CMS at `/admin` with protected authentication, product CRUD, order status manager, and live hero slider editor.

---

## 📁 Project Structure

```
natural-mantra-website/
├── frontend/
│   ├── public/
│   │   ├── assets/                # Logo SVG/PNG and brand visuals
│   │   ├── robots.txt             # Search engine crawler permissions
│   │   └── sitemap.xml            # SEO URL index map
│   ├── src/
│   │   ├── admin/                 # Admin Panel components & dashboard
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   └── ...
│   │   ├── components/            # Header, Footer, ProductCards, Modals
│   │   ├── context/               # AuthContext, CartContext, WishlistContext, SettingsContext
│   │   ├── data/                  # Seed dataset & mock fallback state
│   │   ├── pages/                 # Customer store pages (Home, Shop, ProductDetail, Cart, Checkout, TrackOrder)
│   │   ├── services/              # Axios REST API client & fallbacks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── config/                # Mongoose database connection
│   │   ├── middleware/            # JWT protect & admin role guards
│   │   ├── models/                # User, Product, Category, Order schemas
│   │   ├── utils/                 # seed.js database populator
│   │   └── server.js              # Express REST server
│   └── package.json
├── vercel.json                    # Vercel deployment SPA configuration
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Express server runs on `http://localhost:5000`.

### 3. Database Seeding (Optional)
To seed local MongoDB with realistic products & admin credentials:
```bash
cd backend
npm run seed
```

---

## 🔑 Admin Panel Access & Credentials
- **Admin Login URL**: `/admin/login`
- **Default Seed Email**: `admin@naturalmantra.com`
- **Default Seed Password**: `Admin@123456`

---

## 🚀 Deployment Instructions

### Vercel Deployment (Frontend)
1. Push project to GitHub/GitLab.
2. Import project into Vercel dashboard.
3. Set root directory to `frontend`.
4. Set build command: `npm run build` and output directory: `dist`.
5. Set environment variable: `VITE_API_URL=https://your-backend-api-url.com/api`.

---

## 📍 Registered Business Info
- **Business Name**: Natural Mantra
- **Address**: 28 Mapple Residency, Peer Muchhala, Zirakpur, Punjab - 140603
- **Email**: Mayank2june@gmail.com
- **GSTIN**: `03BEVPM2912R1ZV`
