# 🚚 Package Delivery Tracker

Application web complète de gestion et suivi de colis avec
authentification par session et tracking en temps réel.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Express](https://img.shields.io/badge/Backend-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Session](https://img.shields.io/badge/Auth-Session--Based-orange)
![WebSocket](https://img.shields.io/badge/Realtime-WebSocket-purple)

------------------------------------------------------------------------

## 📌 Overview

Package Delivery Tracker est une application full-stack permettant :

-   🔐 Authentification basée sur session (2h)
-   👤 Gestion des rôles : **Admin**, **Driver**, **Customer**
-   📦 Création et gestion des packages
-   🚚 Gestion des livraisons
-   🗺 Tracking en temps réel via WebSocket
-   🧭 Interface moderne avec React + Tailwind

------------------------------------------------------------------------

## 🏗 Architecture

    project-root/
    │
    ├── backend/        # API REST + WebSocket + Sessions
    └── frontend/       # React + Vite + Tailwind

------------------------------------------------------------------------

## 🛠 Tech Stack

### Backend

-   Node.js
-   Express
-   MongoDB + Mongoose
-   express-session
-   ws (WebSocket)
-   bcrypt
-   CORS

### Frontend

-   React (Vite)
-   React Router
-   Axios
-   Tailwind CSS
-   Leaflet

------------------------------------------------------------------------

## 🔐 Authentication

-   Session-based authentication
-   Cookies `httpOnly`
-   Session lifetime: **2 hours**
-   Role-based access control (RBAC)

Roles available:

-   `admin`
-   `driver`
-   `customer`

------------------------------------------------------------------------

## 🚀 Getting Started

### 1️⃣ Clone the repository

``` bash
git clone https://github.com/your-username/package-delivery-tracker.git
cd package-delivery-tracker
```

------------------------------------------------------------------------

# ⚙️ Backend Setup

### 📂 Navigate to backend

``` bash
cd backend
```

### 📦 Install dependencies

``` bash
npm install
```

### 📝 Create `.env` file

``` env
PORT=5000
MONGO_URI=mongodb://localhost:27017/package_tracker
SESSION_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### ▶️ Run the backend

``` bash
npm run dev
```

Server runs at:

    http://localhost:5000

------------------------------------------------------------------------

# 🎨 Frontend Setup

### 📂 Navigate to frontend

``` bash
cd frontend
```

### 📦 Install dependencies

``` bash
npm install
```

### ▶️ Run the frontend

``` bash
npm run dev
```

Application runs at:

    http://localhost:5173

------------------------------------------------------------------------

# 🔄 Real-Time Tracking

The system uses WebSocket for:

-   Delivery location updates
-   Live tracking for customers
-   Driver location broadcasting every 20 seconds

------------------------------------------------------------------------

# 👤 Role Features

## 🛠 Admin

-   Create packages
-   Create deliveries
-   View packages list
-   View deliveries list

## 🚚 Driver

-   Load delivery
-   Share real-time location
-   View source and destination on map

## 📦 Customer

-   Track package by ID
-   View delivery status
-   Real-time location updates

------------------------------------------------------------------------

# 🔒 Security Best Practices

-   Password hashing with bcrypt
-   Session-based authentication
-   No password hash exposed to frontend
-   HTTP-only cookies
-   CORS with credentials enabled
-   Role-based route protection

------------------------------------------------------------------------

# 📦 Environment Variables

  Variable         Description
  ---------------- -------------------------------
  PORT             Backend server port
  MONGO_URI        MongoDB connection string
  SESSION_SECRET   Secret for session encryption
  CLIENT_URL       Frontend origin for CORS

------------------------------------------------------------------------

# 📈 Future Improvements

-   Pagination & search
-   Dashboard analytics
-   Notifications (toast)
-   Docker support
-   CI/CD pipeline
-   Production deployment guide

------------------------------------------------------------------------

# 📄 License

This project is licensed under the MIT License.

------------------------------------------------------------------------

# 👨‍💻 Author

Developed by **Honoré ADJAGO**
