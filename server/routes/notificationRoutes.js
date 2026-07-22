import express from "express";

import {
  getNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Get Notifications
router.get("/", getNotifications);

// Mark Read
router.put("/:id/read", markAsRead);

// Mark All Read
router.put("/read-all", markAllRead);

// Delete
router.delete("/:id", deleteNotification);

export default router;