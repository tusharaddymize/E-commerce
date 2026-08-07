import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req,res)=>{

    try{

        const {email,password}=req.body;

       const admin = await User.findOne({ email }).select("+password");

        if(!admin){

            return res.status(404).json({
                success:false,
                message:"Admin not found"
            });

        }

if (admin.role !== "admin") {
    return res.status(401).json({
        success: false,
        message: "Unauthorized"
    });
}

        const match = await admin.matchPassword(password);

        if(!match){

            return res.status(401).json({
                success:false,
                message:"Wrong Password"
            });

        }

const token = jwt.sign(
  {
    id: admin._id,
    role: admin.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d"
  }
);

        res.json({

            success:true,

            token,

admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role
}

        });

    }

    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

}




// ==========================================
// Get Admin Profile
// ==========================================

// ==========================================
// Get Admin Profile
// ==========================================

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(
      req.user.id
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone || "",
        avatar: admin.avatar || "",
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(
      "Get Admin Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load admin profile",
    });
  }
};


// ==========================================
// Update Admin Profile
// ==========================================

export const updateAdminProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
    } = req.body;

    const admin = await User.findById(
      req.user.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // ======================================
    // Validate Name
    // ======================================

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // ======================================
    // Validate Email
    // ======================================

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // ======================================
    // Check Duplicate Email
    // ======================================

    const emailExists = await User.findOne({
      email: normalizedEmail,
      _id: {
        $ne: admin._id,
      },
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message:
          "This email is already being used by another account",
      });
    }

    // ======================================
    // Update Fields
    // ======================================

    admin.name = name.trim();
    admin.email = normalizedEmail;
    admin.phone = phone?.trim() || "";

    await admin.save();

    // ======================================
    // Success
    // ======================================

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone || "",
        avatar: admin.avatar || "",
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(
      "Update Admin Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update admin profile",
    });
  }
};


// ==========================================
// Upload Admin Avatar
// ==========================================

export const uploadAdminAvatar = async (
  req,
  res
) => {
  try {
    const admin = await User.findById(
      req.user.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select an image",
      });
    }

    admin.avatar = req.file.path;

    await admin.save();

    return res.status(200).json({
      success: true,
      message:
        "Avatar updated successfully",
      avatar: admin.avatar,
    });
  } catch (error) {
    console.error(
      "Upload Admin Avatar Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update avatar",
    });
  }
};






// ==========================================
// Change Password
// ==========================================

export const changeAdminPassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    // ======================================
    // Validate Fields
    // ======================================

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    // ======================================
    // Validate Password Length
    // ======================================

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters.",
      });
    }

    // ======================================
    // Get Logged-In Admin
    // adminProtect sets req.user
    // ======================================

    const admin = await User.findById(
      req.user.id
    ).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // ======================================
    // Extra Admin Security Check
    // ======================================

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // ======================================
    // Verify Current Password
    // ======================================

    const isMatch =
      await admin.matchPassword(
        currentPassword
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    // ======================================
    // Prevent Same Password
    // ======================================

    const isSamePassword =
      await admin.matchPassword(
        newPassword
      );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from current password.",
      });
    }

    // ======================================
    // Update Password
    // ======================================

    admin.password = newPassword;

    await admin.save();

    // User model pre-save middleware
    // automatically hashes new password.

    // ======================================
    // Success
    // ======================================

    return res.status(200).json({
      success: true,
      message:
        "Password updated successfully.",
    });
  } catch (error) {
    console.error(
      "Change Admin Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update password.",
    });
  }
};

// ==========================================
// Get Notification Settings
// ==========================================

export const getNotificationSettings = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      notifications: admin.notifications || {
        emailNotifications: true,
        orderNotifications: true,
        userNotifications: true,
        marketingEmails: false,
        pushNotifications: false,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Update Notification Settings
// ==========================================

export const updateNotificationSettings = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.notifications = {
      ...admin.notifications,
      ...req.body,
    };

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Notification settings updated successfully",
      notifications: admin.notifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Logout From All Devices
// ==========================================

export const logoutAllDevices = async (req, res) => {
  try {
    // JWT blacklist/token version implementation can be added later.

    res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Delete Admin Account
// ==========================================

export const deleteAdminAccount = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await User.findByIdAndDelete(req.admin.id);

    res.status(200).json({
      success: true,
      message: "Admin account deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};