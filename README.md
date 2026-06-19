# 🐝 TourBee

TourBee is a comprehensive tour management and booking platform designed to simplify the travel experience. It provides a seamless interface for users to discover tours, manage bookings, and process secure payments, while offering administrators a robust dashboard to manage inventory and user operations.

---

### 🌐 Live Demo : https://tour-bee-theta.vercel.app

## 🚀 Features

* **Tour Discovery:** Browse a curated list of travel destinations with detailed pricing, guides, and location metrics.
* **Booking System:** Intuitive booking reservation flow with real-time guest count validation.
* **Secure Payments:** Integrated with SSLCommerz gateway protocols for secure transaction processing.
* **Role-Based Access (RBAC):** Dedicated dashboards and layout structures for Users, Admins, and Super Admins.
* **Responsive UI:** A "Cyber/Robotic" inspired minimalist design built with React and Tailwind CSS.
* **Secure Auth:** JWT-based authentication with HttpOnly cookies for maximum protection against XSS.

---

## 🛠 Tech Stack

### Client (Frontend)
* **Framework:** React (Vite)
* **State Management:** Redux Toolkit & RTK Query (For global application state & API caching)
* **Styling:** Tailwind CSS (Minimalist / Cyber aesthetic)
* **Iconography:** Lucide React
* **Routing:** React Router (Data router architecture)

### Server (Backend)
* **Runtime & Framework:** Node.js & Express
* **Database:** MongoDB & Mongoose
* **Payment Gateway:** SSLCommerz
* **Authentication:** JWT (JSON Web Tokens)
* **Data Validation:** Zod

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (v18 or higher)
* MongoDB Instance (Local or Atlas cluster)
* SSLCommerz Sandbox/Live Store Credentials

### 1. Setup Backend Server
```bash
# Clone the server repository
git clone https://github.com/7saffix/TourBee-server
cd TourBee-server

# Install dependencies
npm install

# Configure environment variables
.env.example

# Start development server
npm run dev
```

### 2. Setup Frontend
```

git clone https://github.com/7saffix/TourBee-Frontend
cd TourBee-Frontend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file in the root directory and set your backend instance URL:
# VITE_API_BASE_URL=http://localhost:5000/api/v1

# Start development server
npm run dev
```
### System Architecture & Core Layout
```
├── TourBee-client/ (Frontend Application)
│   ├── src/
│   │   ├── components/        # Shared presentation nodes (Navbar, UI cards)
│   │   ├── pages/             # Route containers (Checkout, Success, Failure)
│   │   ├── redux/             # Redux state controllers & API slices
│   │   └── routes/            # React Router configurations using Component mapping
```

### 🛡 Security & Best Practices
Cookie Security: Uses HttpOnly, SameSite=Lax/None, and Secure flags for JWT tokens to neutralize potential XSS and CSRF attack variants.

API Interception: Client network instance layers configured to automatically catch 401 Unauthorized responses to cleanly drop stale local sessions.

Input Validation: All server mutation request bodies pass through a strict Zod schema runtime validation stack before database execution.

### 📝 License
This project is licensed under the MIT License.

### Developed by
Shah Aziz Chowdhury Safi 
