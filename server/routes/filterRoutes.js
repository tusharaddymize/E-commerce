import express from "express";

import {
  getFilters,
  getFilterById,
  getFiltersBySubCategory,
  createFilter,
  updateFilter,
  deleteFilter,
} from "../controllers/filterController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// Public / Product Attribute Routes
// ==========================================

// Add/Edit Product ke liye subcategory attributes
router.get(
  "/subcategory/:subCategoryId",
  getFiltersBySubCategory
);

// Get all filters
router.get("/", getFilters);

// Get single filter
router.get("/:id", getFilterById);

// ==========================================
// Admin Routes
// ==========================================

router.post(
  "/",
  protect,
  admin,
  createFilter
);

router.put(
  "/:id",
  protect,
  admin,
  updateFilter
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteFilter
);

export default router;