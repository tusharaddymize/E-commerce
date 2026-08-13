import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

import {
  sendWelcomeEmail,
  sendRegistrationOtpEmail,
  sendLoginOtpEmail,
  sendForgotPasswordOtpEmail,
} from "../services/emailServices.js";

// ======================================================
// Helper: Generate 6 Digit OTP
// ======================================================

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ======================================================
// Helper: OTP Expiry - 10 Minutes
// ======================================================

const getOtpExpiry = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};

// ======================================================
// Register User
// POST /api/auth/register
// ======================================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Check Existing User
    // ===============================

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ===============================
    // Generate OTP
    // ===============================

    const otp = generateOtp();
    const otpExpires = getOtpExpiry();

    console.log(
      `🔐 Registration OTP for ${normalizedEmail}: ${otp}`
    );

    // ===============================
    // Create User
    // ===============================

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,

      isVerified: false,

      emailVerificationOtp: otp,
      emailVerificationOtpExpires: otpExpires,
    });

    // ===============================
    // Send Registration OTP
    // ===============================

    try {
      await sendRegistrationOtpEmail(
        user.email,
        otp
      );

      console.log(
        `✅ Registration OTP sent to ${user.email}`
      );
    } catch (emailError) {
      console.error(
        "❌ Registration OTP Email Error:",
        emailError
      );

      await User.findByIdAndDelete(user._id);

      return res.status(500).json({
        success: false,
        message:
          "Unable to send OTP email. Please try again.",
      });
    }

    // ===============================
    // Do NOT Generate Token
    // ===============================

    return res.status(201).json({
      success: true,
      otpRequired: true,
      message: "Verification OTP sent to your email",
      email: user.email,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Verify Registration OTP
// POST /api/auth/verify-registration-otp
// ======================================================

export const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // Already Verified
    // ===============================

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // ===============================
    // Check OTP
    // ===============================

    if (
      !user.emailVerificationOtp ||
      user.emailVerificationOtp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ===============================
    // Check Expiry
    // ===============================

    if (
      !user.emailVerificationOtpExpires ||
      user.emailVerificationOtpExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // ===============================
    // Verify User
    // ===============================

    user.isVerified = true;

    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpires = null;

    await user.save();

    // ===============================
    // Send Welcome Email
    // ===============================

    try {
      if (sendWelcomeEmail) {
        await sendWelcomeEmail(
          user.email,
          user.name
        );
      }
    } catch (emailError) {
      console.error(
        "Welcome Email Error:",
        emailError
      );
    }

    // ===============================
    // Generate JWT
    // ===============================

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(
      "Verify Registration OTP Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Login User
// POST /api/auth/login
// ======================================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===============================
    // Check Blocked User
    // ===============================

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been blocked. Please contact support.",
      });
    }

    // ===============================
    // Check Password
    // ===============================

    const isPasswordMatch =
      await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===============================
    // Check Email Verification
    // ===============================

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        otpRequired: true,
        notVerified: true,
        message:
          "Please verify your email before logging in.",
        email: user.email,
      });
    }

    // ===============================
    // Generate Login OTP
    // ===============================

    const otp = generateOtp();
    const otpExpires = getOtpExpiry();

    user.loginOtp = otp;
    user.loginOtpExpires = otpExpires;

    await user.save();

    console.log(
      `🔐 Login OTP for ${user.email}: ${otp}`
    );

    // ===============================
    // Send Login OTP
    // ===============================

    try {
      await sendLoginOtpEmail(
        user.email,
        otp
      );

      console.log(
        `✅ Login OTP sent to ${user.email}`
      );
    } catch (emailError) {
      console.error(
        "❌ Login OTP Email Error:",
        emailError
      );

      user.loginOtp = null;
      user.loginOtpExpires = null;

      await user.save();

      return res.status(500).json({
        success: false,
        message:
          "Unable to send login OTP. Please try again.",
      });
    }

    // ===============================
    // Do NOT Generate JWT Yet
    // ===============================

    return res.status(200).json({
      success: true,
      otpRequired: true,
      message: "Login OTP sent to your email",
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Verify Login OTP
// POST /api/auth/verify-login-otp
// ======================================================

export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // Check Block
    // ===============================

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    // ===============================
    // Check OTP
    // ===============================

    if (
      !user.loginOtp ||
      user.loginOtp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ===============================
    // Check Expiry
    // ===============================

    if (
      !user.loginOtpExpires ||
      user.loginOtpExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP has expired. Please login again.",
      });
    }

    // ===============================
    // Clear OTP
    // ===============================

    user.loginOtp = null;
    user.loginOtpExpires = null;

    await user.save();

    // ===============================
    // Generate JWT
    // ===============================

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(
      "Verify Login OTP Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Forgot Password
// POST /api/auth/forgot-password
// ======================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // ===============================
    // Generate OTP
    // ===============================

    const otp = generateOtp();
    const otpExpires = getOtpExpiry();

    user.forgotPasswordOtp = otp;
    user.forgotPasswordOtpExpires = otpExpires;

    await user.save();

    console.log(
      `🔐 Forgot Password OTP for ${user.email}: ${otp}`
    );

    // ===============================
    // Send OTP
    // ===============================

    try {
      await sendForgotPasswordOtpEmail(
        user.email,
        otp
      );

      console.log(
        `✅ Forgot Password OTP sent to ${user.email}`
      );
    } catch (emailError) {
      console.error(
        "❌ Forgot Password Email Error:",
        emailError
      );

      user.forgotPasswordOtp = null;
      user.forgotPasswordOtpExpires = null;

      await user.save();

      return res.status(500).json({
        success: false,
        message:
          "Unable to send OTP email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      otpRequired: true,
      message:
        "Password reset OTP sent to your email",
      email: user.email,
    });
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Verify Forgot Password OTP
// POST /api/auth/verify-forgot-password-otp
// ======================================================

export const verifyForgotPasswordOtp = async (
  req,
  res
) => {
  try {
    const { email, otp } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // Check OTP
    // ===============================

    if (
      !user.forgotPasswordOtp ||
      user.forgotPasswordOtp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ===============================
    // Check Expiry
    // ===============================

    if (
      !user.forgotPasswordOtpExpires ||
      user.forgotPasswordOtpExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      email: user.email,
      otpVerified: true,
    });
  } catch (error) {
    console.error(
      "Verify Forgot Password OTP Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Reset Password
// POST /api/auth/reset-password
// ======================================================

export const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      newPassword,
    } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Email, OTP and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // Verify OTP Again
    // ===============================

    if (
      !user.forgotPasswordOtp ||
      user.forgotPasswordOtp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ===============================
    // Check Expiry Again
    // ===============================

    if (
      !user.forgotPasswordOtpExpires ||
      user.forgotPasswordOtpExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    // ===============================
    // Update Password
    // ===============================

    user.password = newPassword;

    // ===============================
    // Clear OTP
    // ===============================

    user.forgotPasswordOtp = null;
    user.forgotPasswordOtpExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully. Please login.",
    });
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Get Current User
// GET /api/auth/me
// ======================================================

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
        notifications: user.notifications,
        addresses: user.addresses,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error(
      "Get Current User Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Update Profile
// PUT /api/auth/profile
// ======================================================

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      phone,
      avatar,
    } = req.body;

    // ===============================
    // Update Fields
    // ===============================

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Change Password
// PUT /api/auth/password
// ======================================================

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide both passwords",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    // ===============================
    // Find User
    // ===============================

    const user = await User.findById(
      req.user._id
    ).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // Check Current Password
    // ===============================

    const isMatch =
      await user.matchPassword(
        currentPassword
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect",
      });
    }

    // ===============================
    // Update Password
    // ===============================

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};