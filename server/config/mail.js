import "dotenv/config";
import nodemailer from "nodemailer";

// ==========================================
// Debug Environment Variables
// ==========================================

console.log("EMAIL_USER:", process.env.EMAIL_USER);

console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS
    ? "Loaded ✅"
    : "Missing ❌"
);

// ==========================================
// Gmail Transporter
// ==========================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 465,

  secure: true,

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },

  // ======================================
  // Timeouts
  // ======================================

  connectionTimeout: 10000,

  greetingTimeout: 10000,

  socketTimeout: 10000,
});

// ==========================================
// Verify SMTP
// Only in Development
// ==========================================

if (process.env.NODE_ENV !== "production") {
  transporter.verify((error, success) => {
    if (error) {
      console.error(
        "❌ Mail Error:",
        error.message
      );
    } else {
      console.log("✅ Gmail Connected");
    }
  });
}

// ==========================================
// Export
// ==========================================

export default transporter;