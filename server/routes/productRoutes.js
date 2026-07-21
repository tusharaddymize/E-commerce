import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import upload from "../middleware/upload.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================================
// Public Routes
// =======================================

// Get All Products
router.get("/", getProducts);

// Search Products
// IMPORTANT: This route must be BEFORE "/:id"
router.get("/search", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// =======================================
// Admin Routes
// =======================================

// Create Product
router.post(
  "/",
  protect,
  admin,
  upload.single("thumbnail"),
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  admin,
  upload.single("thumbnail"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

export default router;