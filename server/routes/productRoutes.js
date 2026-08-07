import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductFilters,
} from "../controllers/productController.js";

import upload from "../middleware/upload.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================================
// Public Routes
// =======================================

// Get All Products
router.get("/", getProducts);

// Get Dynamic Filters
router.get("/filters", getProductFilters);

// Search Products
router.get("/search", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// =======================================
// Product Image Upload Configuration
// =======================================
//
// thumbnail = Main product image
// images    = Additional angle images
//
// Maximum:
// 1 Main Image
// 4 Additional Images
// Total = 5 Images
// =======================================

const productImageUpload = upload.fields([
  {
    name: "thumbnail",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 4,
  },
]);

// =======================================
// Admin Routes
// =======================================

// Create Product
router.post(
  "/",
  protect,
  admin,
  productImageUpload,
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  admin,
  productImageUpload,
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