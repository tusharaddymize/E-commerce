import express from "express";

import {
  getFlashDeal,
  getAllFlashDeals,
  getFlashDealById,
  createFlashDeal,
  updateFlashDeal,
  deleteFlashDeal,
} from "../controllers/flashDealController.js";

const router = express.Router();
import upload from "../middleware/upload.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// ==========================================
// Public Routes
// ==========================================

// Homepage Active Flash Deal
router.get("/", getFlashDeal);

// ==========================================
// Admin Routes
// ==========================================

// Get All Flash Deals
router.get("/all", getAllFlashDeals);

// Get Single Flash Deal
router.get("/:id", getFlashDealById);

// Create Flash Deal
router.post(
  "/",
  protect,
  admin,
  upload.single("bannerImage"),
  createFlashDeal
);

// Update Flash Deal
router.put(
  "/:id",
  protect,
  admin,
  upload.single("bannerImage"),
  updateFlashDeal
);

// Delete Flash Deal
router.delete("/:id", deleteFlashDeal);

export default router;