import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getDashboardOverview } from "../controllers/dashboardController.js";

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

export default router;