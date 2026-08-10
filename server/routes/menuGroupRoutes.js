import express from "express";

import {
  getMenuGroups,
  getMenuGroup,
  createMenuGroup,
  updateMenuGroup,
  deleteMenuGroup,
} from "../controllers/menuGroupController.js";

const router = express.Router();


// GET ALL
router.get("/", getMenuGroups);


// GET ONE
router.get("/:id", getMenuGroup);


// CREATE
router.post(
  "/",
  createMenuGroup
);


// UPDATE
router.put(
  "/:id",
  updateMenuGroup
);


// DELETE
router.delete(
  "/:id",
  deleteMenuGroup
);

export default router;