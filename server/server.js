import dotenv from "dotenv";
dotenv.config();


import express from "express";

import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();

// =============================
// Connect MongoDB
// =============================
connectDB();

// =============================
// Middlewares
// =============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/admin/analytics", analyticsRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
// =============================
// Test Route
// =============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Commerce API Running Successfully 🚀",
  });
});

// =============================
// API Routes
// =============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// =============================
// 404 Route
// =============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =============================
// Global Error Handler
// =============================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =============================
// Server
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});