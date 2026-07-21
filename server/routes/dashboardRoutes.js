import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getDashboardOverview,
  getRevenueAnalytics,
  getSalesAnalytics,
  getInventoryAnalytics,
  getCustomerAnalytics,
  getOrderAnalytics,
} from "../controllers/dashboardController.js";
const router = express.Router();

// ==========================================
// Dashboard Overview
// GET /api/admin/dashboard
// ==========================================
router.get(
  "/",
  protect,
  admin,
  getDashboardOverview
);

// ==========================================
// Revenue Analytics
// GET /api/admin/dashboard/revenue
// ==========================================
router.get(
  "/revenue",
  protect,
  admin,
  getRevenueAnalytics
);

// ==========================================
// Sales Analytics
// GET /api/admin/dashboard/sales
// ==========================================
router.get(
  "/sales",
  protect,
  admin,
  getSalesAnalytics
);

// ==========================================
// Inventory Analytics
// GET /api/admin/dashboard/inventory
// ==========================================
router.get(
  "/inventory",
  protect,
  admin,
  getInventoryAnalytics
);


// ==========================================
// Customer Analytics
// GET /api/admin/dashboard/customers
// ==========================================

router.get(
  "/customers",
  protect,
  admin,
  getCustomerAnalytics
);



// ==========================================
// Order Analytics
// GET /api/admin/dashboard/orders
// ==========================================

router.get(
  "/orders",
  protect,
  admin,
  getOrderAnalytics
);
export default router;