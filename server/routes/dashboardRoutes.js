import express from "express";

import {
  getDashboardOverview,
  getRevenueAnalytics,
  getSalesAnalytics,
  getInventoryAnalytics,
  getCustomerAnalytics,
  getOrderAnalytics,
} from "../controllers/dashboardController.js";

import adminProtect from "../middleware/adminMiddleware.js";

const router = express.Router();

// ==========================================
// Dashboard Overview
// GET /api/admin/dashboard
// ==========================================

router.get(
  "/",
  adminProtect,
  getDashboardOverview
);

// ==========================================
// Revenue Analytics
// GET /api/admin/dashboard/revenue
// ==========================================
router.get(
  "/revenue",
  adminProtect,
  getRevenueAnalytics
);
// ==========================================
// Sales Analytics
// GET /api/admin/dashboard/sales
// ==========================================

router.get(
  "/sales",
  adminProtect,
  getSalesAnalytics
);
// ==========================================
// Inventory Analytics
// GET /api/admin/dashboard/inventory
// ==========================================

router.get(
  "/inventory",
  adminProtect,
  getInventoryAnalytics
);

// ==========================================
// Customer Analytics
// GET /api/admin/dashboard/customers
// ==========================================

router.get(
  "/customers",
  adminProtect,
  getCustomerAnalytics
);

// ==========================================
// Order Analytics
// GET /api/admin/dashboard/orders
// ==========================================

router.get(
  "/orders",
  adminProtect,
  getOrderAnalytics
);

export default router;