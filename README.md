# 🛒 E-Commerce Full Stack Website

A powerful, production-grade **MERN stack** (MongoDB, Express, React, Node.js) e-commerce application with a complete **admin dashboard**, **authentication**, **payment integration**, and more.

---

## 📌 Features

### 🔐 User Functionality
- User authentication using **JWT tokens**
- Login / Register / Profile update
- Protected routes (only accessible to logged-in users)
- Add to cart, place order, and track status

### 💳 Payment System
- Integrated **PayPal sandbox API** for testing real-like payments
- Order summary, payment method, and success/failure handling

### 🛍️ Product Features
- Dynamic product listing with categories & filters
- Product details page with image, description, and stock info
- Admin can create, edit, delete, or restock products

### 📊 Admin Dashboard
- View all orders, users, and products
- **Interactive sales graph** for revenue visualization
- Order status management (Pending, Delivered, etc.)
- Product filtering by category, price, stock

### 🔁 State Management
- Full **Redux Toolkit** setup for global state (auth, cart, product, orders)
- API integration using `RTK Query` or custom hooks

---

## ⚙️ Technologies Used

### 🧠 Backend:
- **Node.js**, **Express**
- **MongoDB** with Mongoose
- **JWT** for auth
- RESTful APIs

### 🎨 Frontend:
- **React.js** (Vite or CRA)
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS / CSS Modules / Bootstrap**

### 💳 Payment:
- **PayPal sandbox API**

### 📈 Charts:
- **ApexCharts** / **Chart.js** for sales data visualization

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ecommerce-site.git
cd ecommerce-site

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
