import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// =============================================
// Routes
// =============================================
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import menuGroupRoutes from "./routes/menuGroupRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";

import analyticsRoutes from "./routes/analyticsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";
import websiteSettingRoutes from "./routes/websiteSettingRoutes.js";
import flashDealRoutes from "./routes/flashDealRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";


const app = express();

// =============================================
// Connect MongoDB
// =============================================

connectDB();

// =============================================
// Middlewares
// =============================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =============================================
// Home Route
// =============================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Commerce API Running Successfully 🚀",
  });
});

// =============================================
// Authentication
// =============================================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// =============================================
// User
// =============================================

app.use("/api/address", addressRoutes);

// =============================================
// Products
// =============================================

app.use("/api/products", productRoutes);

// =============================================
// Reviews
// =============================================

app.use("/api/reviews", reviewRoutes);
// =============================================
// Categories
// =============================================

app.use("/api/categories", categoryRoutes);

app.use(
  "/api/menu-groups",
  menuGroupRoutes
);

app.use(
  "/api/sub-categories",
  subCategoryRoutes
);

// =============================================
// Orders
// =============================================

app.use("/api/orders", orderRoutes);

// =============================================
// Flash Deals
// =============================================

app.use(
  "/api/flash-deals",
  flashDealRoutes
);

// =============================================
// Coupons
// =============================================

app.use("/api/coupons", couponRoutes);
app.use("/api/filters", filterRoutes);
// =============================================
// Website Settings
// =============================================

app.use(
  "/api/website-settings",
  websiteSettingRoutes
);

// =============================================
// Notifications
// =============================================

app.use(
  "/api/notifications",
  notificationRoutes
);

// =============================================
// Admin
// =============================================

app.use("/api/admin", adminRoutes);

app.use(
  "/api/admin/analytics",
  analyticsRoutes
);

app.use(
  "/api/admin/dashboard",
  dashboardRoutes
);

// =============================================
// 404
// =============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =============================================
// Global Error Handler
// =============================================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

// =============================================
// Server
// =============================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `✅ Server running on port ${PORT}`
  );
});