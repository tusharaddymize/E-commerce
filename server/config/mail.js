import "dotenv/config";
import nodemailer from "nodemailer";

console.log("==========================================");
console.log("📧 EMAIL CONFIG");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("==========================================");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  // Force IPv4
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Gmail SMTP Error:", error);
  } else {
    console.log("✅ Gmail SMTP Connected Successfully");
  }
});

export default transporter;