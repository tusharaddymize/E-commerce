import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  try {
   await mongoose.connect(process.env.MONGODB_URI);// ya jo bhi env var name hai tumhare .env me

    const admin = await User.findOne({ email: "admin@example.com" });

    if (!admin) {
      console.log("❌ Admin not found");
      process.exit(1);
    }

    console.log("BEFORE:", {
      isVerified: admin.isVerified,
      role: admin.role,
    });

    admin.isVerified = true;
    await admin.save(); // ye .save() hone se pre-save hook bhi trigger hoga

    console.log("✅ AFTER: Admin isVerified set to true");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

run();