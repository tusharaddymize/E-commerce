import jwt from "jsonwebtoken";
import User from "../models/User.js";

const adminProtect = async (req, res, next) => {
  try {
    // ==========================
    // Get Token
    // ==========================
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // ==========================
    // Verify Token
    // ==========================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ==========================
    // Find Admin
    // ==========================
    const admin = await User.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // ==========================
    // Check Admin Role
    // ==========================
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // ==========================
    // Check Blocked
    // ==========================
    if (admin.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked.",
      });
    }

    // ==========================
    // Attach Admin
    // ==========================
    req.user = {
      id: admin._id,
      role: admin.role,
      email: admin.email,
      name: admin.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default adminProtect;