import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

// ==========================
// Check Environment Variables
// ==========================

console.log("Cloudinary Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

// ==========================
// Cloudinary Config
// ==========================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;