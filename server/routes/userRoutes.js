import express from "express";

import {
  uploadAvatar,
  updateProfile,
  changePassword,
  getProfileStats,
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserBlock,
  deleteUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfile
);

// Upload Avatar
router.put(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

//change password
router.put(
  "/change-password",
  protect,
  changePassword
);

router.get(
  "/profile/stats",
  protect,
  getProfileStats
);



// ===============================
// Admin - Get All Users
// ===============================
router.get(
  "/admin/all",
  protect,
  getAllUsers
);

// ===============================
// Admin - Get Single User
// ===============================
router.get(
  "/admin/:id",
  protect,
  getUserById
);


// ===============================
// Admin - Update User Role
// ===============================
router.put(
  "/admin/:id/role",
  protect,
  updateUserRole
);

// ===============================
// Admin - Block / Unblock User
// ===============================
router.put(
  "/admin/:id/block",
  protect,
  toggleUserBlock
);

// ===============================
// Admin - Delete User
// ===============================
router.delete(
  "/admin/:id",
  protect,
  deleteUser
);

export default router;