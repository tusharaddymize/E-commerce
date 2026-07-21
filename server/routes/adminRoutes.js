// import express from "express";

// import { adminLogin } from "../controllers/adminController.js";

// import adminProtect from "../middleware/adminMiddleware.js";

// const router=express.Router();

// router.post("/login",adminLogin);

// router.get("/dashboard",adminProtect,(req,res)=>{

//     res.json({

//         success:true,

//         message:"Welcome Admin"

//     });

// });

// export default router;




import express from "express";
import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  uploadAdminAvatar,
  changeAdminPassword,
  getNotificationSettings,
  updateNotificationSettings,
  logoutAllDevices,
  deleteAdminAccount,
} from "../controllers/adminController.js";

import adminProtect from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ================================
// Authentication
// ================================
router.post("/login", adminLogin);

// ================================
// Profile
// ================================
router.get("/profile", adminProtect, getAdminProfile);

router.put("/profile", adminProtect, updateAdminProfile);

router.delete("/profile", adminProtect, deleteAdminAccount);

// ================================
// Avatar Upload
// ================================
router.post(
  "/avatar",
  adminProtect,
  upload.single("avatar"),
  uploadAdminAvatar
);

// ================================
// Change Password
// ================================
router.put(
  "/change-password",
  adminProtect,
  changeAdminPassword
);

// ================================
// Notification Settings
// ================================
router.get(
  "/notifications",
  adminProtect,
  getNotificationSettings
);

router.put(
  "/notifications",
  adminProtect,
  updateNotificationSettings
);

// ================================
// Logout All Devices
// ================================
router.post(
  "/logout-all",
  adminProtect,
  logoutAllDevices
);

export default router;