import express from "express";

import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// ==================================================
// GET ALL SUB CATEGORIES
// ==================================================
// All:
// GET /api/sub-categories
//
// By Category:
// GET /api/sub-categories?category=CATEGORY_ID
//
// By Menu Group:
// GET /api/sub-categories?menuGroup=MENU_GROUP_ID

router.get(
  "/",
  getSubCategories
);

// ==================================================
// GET SINGLE SUB CATEGORY
// ==================================================
// GET /api/sub-categories/:id

router.get(
  "/:id",
  getSubCategory
);

// ==================================================
// CREATE SUB CATEGORY
// ==================================================

router.post(
  "/",
  // protect,
  // admin,
  createSubCategory
);

// ==================================================
// UPDATE SUB CATEGORY
// ==================================================

router.put(
  "/:id",
  // protect,
  // admin,
  updateSubCategory
);

// ==================================================
// DELETE SUB CATEGORY
// ==================================================

router.delete(
  "/:id",
  // protect,
  // admin,
  deleteSubCategory
);

export default router;