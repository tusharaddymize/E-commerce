import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
  getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", getAllOrders);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", getOrderById);

router.put("/:id", updateOrderStatus);

router.put("/:id/cancel", cancelOrder);

router.delete("/:id", deleteOrder);

export default router;