import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ==========================================
// Common Email Sender
// ==========================================

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Sending email to:", to);

    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      html,
    };

    const [response] = await sgMail.send(msg);

    console.log("✅ Email sent successfully:", response.statusCode);

    return response;
  } catch (error) {
    console.error(
      "❌ SendGrid Email Error:",
      error.response?.body || error.message
    );

    throw error;
  }
};

// ==========================================
// Registration OTP
// ==========================================

export const sendRegistrationOtpEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "Verify Your Email - Registration OTP",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
      ">
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

        <p>
          This OTP will expire in
          <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not create this account, please ignore this email.
        </p>

        <hr />

        <p style="color:#777;">
          E-Commerce Store
        </p>
      </div>
    `,
  });
};

// ==========================================
// Login OTP
// ==========================================

export const sendLoginOtpEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "Login Verification OTP",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
      ">
        <h2>Login Verification</h2>

        <p>Your login verification OTP is:</p>

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

        <p>
          This OTP will expire in
          <strong>10 minutes</strong>.
        </p>

        <hr />

        <p style="color:#777;">
          E-Commerce Store
        </p>
      </div>
    `,
  });
};

// ==========================================
// Forgot Password OTP
// ==========================================

export const sendForgotPasswordOtpEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
      ">
        <h2>Password Reset</h2>

        <p>Your password reset OTP is:</p>

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

        <p>
          This OTP will expire in
          <strong>10 minutes</strong>.
        </p>

        <hr />

        <p style="color:#777;">
          E-Commerce Store
        </p>
      </div>
    `,
  });
};

// ==========================================
// Welcome Email
// ==========================================

export const sendWelcomeEmail = async (email, name) => {
  return sendEmail({
    to: email,
    subject: "Welcome to Our Store 🎉",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
      ">
        <h2>Welcome ${name}! 🎉</h2>

        <p>
          Your account has been successfully verified.
        </p>

        <p>
          Thank you for joining our store.
        </p>

        <hr />

        <p style="color:#777;">
          E-Commerce Store
        </p>
      </div>
    `,
  });
};