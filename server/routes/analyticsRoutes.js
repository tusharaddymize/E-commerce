import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getProductAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// =====================================
// Product Analytics
// GET /api/admin/analytics
// =====================================

router.get(
  "/",
  protect,
  admin,
  getProductAnalytics
);

export default router;