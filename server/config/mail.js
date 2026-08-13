import "dotenv/config";
import nodemailer from "nodemailer";

// ==========================================
// Environment Debug
// ==========================================

console.log("==========================================");
console.log("📧 EMAIL CONFIG");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("==========================================");

// ==========================================
// Gmail SMTP Transporter
// ==========================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 465,

  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

// ==========================================
// Verify SMTP Connection
// ==========================================

transporter.verify((error, success) => {
  if (error) {
    console.error("==========================================");
    console.error("❌ SMTP / GMAIL CONNECTION FAILED");
    console.error("==========================================");

    console.error("Name:", error.name);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    console.error("Response Code:", error.responseCode);
    console.error("Message:", error.message);

    console.error("==========================================");
  } else {
    console.log("==========================================");
    console.log("✅ Gmail SMTP Connected Successfully");
    console.log("==========================================");
  }
});

// ==========================================
// Export
// ==========================================

export default transporter;