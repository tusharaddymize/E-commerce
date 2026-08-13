import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Sending email to:", to);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend Email Error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully:", data?.id);

    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

export const sendRegistrationOtpEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "Verify Your Email - Registration OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
        <h2 style="color:#355E3B;">Verify Your Email</h2>

        <p>Thank you for registering with our store.</p>

        <p>Your email verification OTP is:</p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          text-align:center;
          padding:20px;
          background:#f3f4f6;
          margin:20px 0;
        ">
          ${otp}
        </div>

        <p>This OTP will expire in <strong>10 minutes</strong>.</p>

        <p>If you did not create this account, please ignore this email.</p>

        <hr />

        <p style="color:#777;">E-Commerce Store</p>
      </div>
    `,
  });
};

export const sendLoginOtpEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "Login Verification OTP",
    html: `
      <div style="font-family:Arial; max-width:600px; margin:auto; padding:30px;">
        <h2>Login Verification</h2>

        <p>Your login verification OTP is:</p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          text-align:center;
          padding:20px;
          background:#f3f4f6;
        ">
          ${otp}
        </div>

        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      </div>
    `,
  });
};

export const sendForgotPasswordOtpEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family:Arial; max-width:600px; margin:auto; padding:30px;">
        <h2>Password Reset</h2>

        <p>Your password reset OTP is:</p>

        <div style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          text-align:center;
          padding:20px;
          background:#f3f4f6;
        ">
          ${otp}
        </div>

        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
      </div>
    `,
  });
};

export const sendWelcomeEmail = async (email, name) => {
  return sendEmail({
    to: email,
    subject: "Welcome to Our Store 🎉",
    html: `
      <div style="font-family:Arial; max-width:600px; margin:auto; padding:30px;">
        <h2>Welcome ${name}! 🎉</h2>

        <p>Your account has been successfully verified.</p>

        <p>Thank you for joining our store.</p>
      </div>
    `,
  });
};