import express from "express";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
  applyCoupon,
  getCouponAnalytics,
} from "../controllers/couponController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import validateCoupon from "../middleware/validateCoupon.js";

const router = express.Router();

// ==========================================
// Public Route (user coupon apply karega checkout par)
// ==========================================
router.post("/apply", applyCoupon);

// ==========================================
// Admin Routes
// ==========================================

// Analytics (specific route upar rakho, warna /:id isse pehle match kar lega)
router.get("/analytics", protect, admin, getCouponAnalytics);

// Get all coupons
router.get("/", protect, admin, getCoupons);

// Create coupon
router.post("/", protect, admin, validateCoupon, createCoupon);

// Get single coupon
router.get("/:id", protect, admin, getCouponById);

// Update coupon
router.put("/:id", protect, admin, updateCoupon);

// Delete coupon
router.delete("/:id", protect, admin, deleteCoupon);

// Toggle active/inactive status
router.patch("/:id/toggle", protect, admin, toggleCouponStatus);

export default router;