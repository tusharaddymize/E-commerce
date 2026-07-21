import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ======================================
// Protected Routes
// ======================================

// Get Logged In User
router.get("/me", protect, getCurrentUser);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/password", protect, changePassword);

export default router;