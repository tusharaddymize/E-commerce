import express from "express";

import {
  checkDeliveryAvailability,
} from "../controllers/deliveryController.js";

const router = express.Router();

// ==========================================
// Check Product Delivery Availability
// ==========================================

router.post(
  "/check",
  checkDeliveryAvailability
);

export default router;