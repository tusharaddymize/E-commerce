import express from "express";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
.get(protect, getAddresses)
.post(protect, addAddress);

router.route("/:id")
.put(protect, updateAddress)
.delete(protect, deleteAddress);

router.put(
  "/default/:id",
  protect,
  setDefaultAddress
);

export default router;