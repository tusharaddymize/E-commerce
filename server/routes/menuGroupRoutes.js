import express from "express";

import {
  getMenuGroups,
  createMenuGroup,
  updateMenuGroup,
  deleteMenuGroup,
} from "../controllers/menuGroupController.js";

const router = express.Router();

router.get("/", getMenuGroups);

router.post("/", createMenuGroup);

router.put("/:id", updateMenuGroup);

router.delete("/:id", deleteMenuGroup);

export default router;