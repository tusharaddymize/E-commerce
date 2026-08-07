import express from "express";

import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  toggleHelpful,
} from "../controllers/reviewController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// Product Reviews
// ==========================================

// Public
// Get all reviews of a product
router.get(
  "/product/:productId",
  getProductReviews
);

// Protected
// Add review to product
router.post(
  "/product/:productId",
  protect,
  createReview
);

// ==========================================
// Individual Review
// ==========================================

// Update own review
router.put(
  "/:reviewId",
  protect,
  updateReview
);

// Delete own review
// Admin can also delete
router.delete(
  "/:reviewId",
  protect,
  deleteReview
);

// ==========================================
// Helpful Review
// ==========================================

router.put(
  "/:reviewId/helpful",
  protect,
  toggleHelpful
);

export default router;