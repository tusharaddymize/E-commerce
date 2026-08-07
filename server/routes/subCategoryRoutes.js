import express from "express";

import {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

router.get("/", getSubCategories);

router.post("/", createSubCategory);

router.put("/:id", updateSubCategory);

router.delete("/:id", deleteSubCategory);

export default router;