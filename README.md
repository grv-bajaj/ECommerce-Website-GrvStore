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
- **React.js** (Vite)
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS / CSS Modules**

### 💳 Payment:
- **PayPal sandbox API**

### 📈 Charts:
- **ApexChart** for sales data visualization

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/grv-bajaj/ECommerce-Website-GrvStore

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the **root** directory with the following content:
```env
# Server configuration
PORT=5000
NODE_ENV=development

# MongoDB connection string
MONGO_URI=mongodb://127.0.0.1:27017/your_db_name

# JWT secret key for user authentication
JWT_SECRET=your_jwt_secret_key_here

# PayPal sandbox client ID
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id_here
```

---

## 🚀 Run the Application

```bash
# In the root folder, start both backend and frontend together
npm run dev
```
---

## 🙋‍♂️ Author

Made with ❤️ by **Gaurav Bajaj**  
Feel free to connect or fork the repo to enhance it further!

---

## 📝 License

This project is open-source and available under the **MIT License**.


