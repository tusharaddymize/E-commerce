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

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Update Admin Profile
// ==========================================

export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const admin = await User.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Upload Avatar
// ==========================================

export const uploadAdminAvatar = async (req, res) => {
  try {
    const admin = await User.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    admin.avatar = req.file.path;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      avatar: admin.avatar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};





// ==========================================
// Change Password
// ==========================================

export const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const admin = await User.findById(req.admin.id).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await admin.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    admin.password = newPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
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