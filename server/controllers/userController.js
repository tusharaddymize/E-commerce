import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Order from "../models/Order.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
// ===============================
// Upload Avatar
// ===============================

  export const uploadAvatar = async (req, res) => {

  console.log("========== Avatar Upload ==========");

  console.log("Content-Type:");
  console.log(req.headers["content-type"]);

  console.log("File:");
  console.log(req.file);

  console.log("Body:");
  console.log(req.body);

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image.",
      });
    }

    
 
    const result = await uploadToCloudinary(
      req.file.buffer,
      "avatars"
    );

    const user = await User.findByIdAndUpdate(
      req.user._id, // _id use karna better hai
      {
        avatar: result.secure_url,
      },
      {
        new: true,
        select: "-password",
      }
    );

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Avatar upload failed.",
    });
  }
};
// ===============================
// Update Profile + Address
// ===============================
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,

      // Address fields
      addressId,
      addressFullName,
      addressPhone,
      address,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // Update Basic Profile Information
    // ==========================================

    if (name?.trim()) {
      user.name = name.trim();
    }

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    // ==========================================
    // Check whether address data was submitted
    // ==========================================

    const hasAddressData =
      addressFullName ||
      addressPhone ||
      address ||
      city ||
      state ||
      pincode;

    if (hasAddressData) {
      // ========================================
      // Validate Address
      // ========================================

      if (
        !addressFullName ||
        !addressPhone ||
        !address ||
        !city ||
        !state ||
        !pincode
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all required address fields",
        });
      }

      // ========================================
      // If Default Address
      // Make all existing addresses non-default
      // ========================================

      if (isDefault === true) {
        user.addresses.forEach((item) => {
          item.isDefault = false;
        });
      }

      // ========================================
      // Update Existing Address
      // ========================================

      if (addressId) {
        const existingAddress =
          user.addresses.id(addressId);

        if (!existingAddress) {
          return res.status(404).json({
            success: false,
            message: "Address not found",
          });
        }

        existingAddress.fullName =
          addressFullName.trim();

        existingAddress.phone =
          addressPhone.trim();

        existingAddress.address =
          address.trim();

        existingAddress.city =
          city.trim();

        existingAddress.state =
          state.trim();

        existingAddress.pincode =
          pincode.trim();

        existingAddress.country =
          country?.trim() || "India";

        existingAddress.isDefault =
          isDefault === true;
      }

      // ========================================
      // Add New Address
      // ========================================

      else {
        user.addresses.push({
          fullName:
            addressFullName.trim(),

          phone:
            addressPhone.trim(),

          address:
            address.trim(),

          city:
            city.trim(),

          state:
            state.trim(),

          pincode:
            pincode.trim(),

          country:
            country?.trim() || "India",

          isDefault:
            isDefault === true,
        });
      }

      // ========================================
      // If this is first address
      // automatically make it default
      // ========================================

      if (user.addresses.length === 1) {
        user.addresses[0].isDefault = true;
      }
    }

    // ==========================================
    // Save User
    // ==========================================

    await user.save();

    // ==========================================
    // Remove Password
    // ==========================================

    const userResponse =
      user.toObject();

    delete userResponse.password;

    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,
      message:
        hasAddressData
          ? "Profile and address updated successfully"
          : "Profile updated successfully",

      user: userResponse,
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Profile update failed",
    });
  }
};
// ===============================
// Change Password
// ===============================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Password update failed",
    });
  }
};


// ===============================
// Profile Statistics
// ===============================
export const getProfileStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Total Orders
    const totalOrders = await Order.countDocuments({
      userId: req.user._id,
    });

    // Total Spent
    const totalSpentResult = await Order.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalSpent =
      totalSpentResult.length > 0
        ? totalSpentResult[0].total
        : 0;

    res.status(200).json({
      success: true,
stats: {
  totalOrders,

  totalSpent,

savedAddresses:
  user.addresses?.length || 0,

  memberSince:
    user.createdAt,
},
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile statistics",
    });
  }
};

// ===============================
// Admin - Get All Users
// ===============================
export const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      users,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Admin - Get Single User
// ===============================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const totalOrders = await Order.countDocuments({
      userId: user._id,
    });

    const totalSpentResult = await Order.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalSpent =
      totalSpentResult.length > 0
        ? totalSpentResult[0].total
        : 0;

    res.status(200).json({
      success: true,
      user,
      stats: {
        totalOrders,
        totalSpent,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===============================
// Admin - Update User Role
// ===============================
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===============================
// Admin - Block / Unblock User
// ===============================
export const toggleUserBlock = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===============================
// Admin - Delete User
// ===============================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};