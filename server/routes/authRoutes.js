import express from "express";

import {
  registerUser,
  verifyRegistrationOtp,

  loginUser,
  verifyLoginOtp,

  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,

  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// PUBLIC ROUTES
// ======================================================

// ======================================================
// Registration
// ======================================================

// Register User
router.post(
  "/register",
  registerUser
);

// Verify Registration OTP
router.post(
  "/verify-registration-otp",
  verifyRegistrationOtp
);

// ======================================================
// Login
// ======================================================

// Login - Send OTP
router.post(
  "/login",
  loginUser
);

// Verify Login OTP
router.post(
  "/verify-login-otp",
  verifyLoginOtp
);

// ======================================================
// Forgot Password
// ======================================================

// Forgot Password - Send OTP
router.post(
  "/forgot-password",
  forgotPassword
);

// Verify Forgot Password OTP
router.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOtp
);

// Reset Password
router.post(
  "/reset-password",
  resetPassword
);

// ======================================================
// PROTECTED ROUTES
// ======================================================

// Get Logged In User
router.get(
  "/me",
  protect,
  getCurrentUser
);

// Update Profile
router.put(
  "/profile",
  protect,
  updateProfile
);

// Change Password
router.put(
  "/password",
  protect,
  changePassword
);

export default router;