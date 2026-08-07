import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendWelcomeEmail } from "../services/emailServices.js";

// ==========================================
// Register User
// POST /api/auth/register
// ==========================================

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

    // ===============================
    // Check Existing User
    // ===============================

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // ===============================
    // Create User
    // ===============================

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // ===============================
    // Send Email (Background)
    // ===============================

    sendWelcomeEmail(user.name, user.email)
      .then(() => {
        console.log(
          `✅ Welcome email sent to ${user.email}`
        );
      })
      .catch((err) => {
        console.error(
          "Welcome Email Error:",
          err.message
        );
      });

    // ===============================
    // Response
    // ===============================

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ==========================================
// Login User
// POST /api/auth/login
// ==========================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ===============================
    // Validation
    // ===============================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // ===============================
    // Find User
    // ===============================

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===============================
    // Compare Password
    // ===============================

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===============================
    // Login Success
    // ===============================

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Get Current User
// GET /api/auth/me
// ==========================================

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get Current User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ==========================================
// Update Profile
// PUT /api/auth/profile
// ==========================================

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ===============================
    // Update Fields
    // ===============================

    if (name) {
      user.name = name;
    }

    if (phone) {
      user.phone = phone;
    }

    if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Change Password
// PUT /api/auth/password
// ==========================================

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

    // Password hash automatically
    // in User model pre("save")

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });

  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};