# UMKM E-commerce Application

Full-stack e-commerce application built with React, Express, Prisma, and SQLite.

## 🚀 Features

### Customer Features
- Product browsing with search and filters
- Shopping cart with persistent storage
- Complete checkout flow with mock payment
- User dashboard (Profile, Orders, Addresses, Wishlist)
- Order tracking and history

### Admin Features
- Dashboard with sales statistics
- Product management (CRUD)
- Order management with status updates
- User management with role assignment

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js + Express
- Prisma ORM
- SQLite (development)
- JWT Authentication
- bcrypt

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/HafidzAlaziz/UMKM_Simple.git
cd UMKM_Simple
```

2. **Install dependencies**

Backend:
```bash
cd server
npm install
```

Frontend:
```bash
cd client
npm install
```

3. **Setup environment variables**

Create `server/.env`:
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_key"
JWT_REFRESH_SECRET="your_refresh_secret_key"
```

4. **Setup database**
```bash
cd server
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

5. **Create admin user**
```bash
cd server
npx ts-node scripts/create-admin.ts
```

## 🏃 Running the Application

**Start Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Start Frontend:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`

## 🔐 Default Credentials

**Admin Account:**
- Email: `admin@umkm.com`
- Password: `admin123`

**Test User (if seeded):**
- Email: `test@example.com`
- Password: `password123`

## 📚 Documentation

- [Quick Start Guide](quick-start.md)
- [Login Guide](LOGIN_GUIDE.md)
- [Admin Panel Guide](ADMIN_GUIDE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Walkthrough](walkthrough.md)

## 🎯 Key Features Implemented

✅ Complete authentication system (JWT)  
✅ Product catalog with categories and brands  
✅ Shopping cart with localStorage  
✅ Checkout flow with mock payment  
✅ User dashboard with order history  
✅ Admin panel for management  
✅ Responsive design  
✅ SEO optimization  

## 📱 Pages

**Public:**
- Home
- Products
- Product Detail
- Categories
- Brands
- About
- Login/Register

**User Dashboard:**
- Profile Management
- Order History
- Address Management
- Wishlist

**Admin Panel:**
- Dashboard Overview
- Product Management
- Order Management
- User Management

## 🔧 Development

**Database Management:**
```bash
npm run prisma:studio  # Open Prisma Studio
npm run prisma:seed    # Seed database
```

**Build for Production:**
```bash
# Backend
cd server
npm run build

# Frontend
cd client
npm run build
```

## 📄 License

MIT

## 👨‍💻 Author

Hafidz Alaziz

## 🙏 Acknowledgments

Built with modern web technologies and best practices.
