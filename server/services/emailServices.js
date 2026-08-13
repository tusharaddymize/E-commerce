import transporter from "../config/mail.js";

import orderConfirmationEmail from "../templates/orderConfirmationEmail.js";
import orderShippedEmail from "../templates/orderShippedEmail.js";
import orderDeliveredEmail from "../templates/orderDeliveredEmail.js";
import orderCancelledEmail from "../templates/orderCancelledEmail.js";

// ======================================================
// Welcome Email
// ======================================================

export const sendWelcomeEmail = async (
  name,
  email
) => {
  try {
    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to E-Commerce",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            padding: 30px;
            background: #f5f5f5;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 10px;
            "
          >

            <h2 style="color:#16a34a;">
              Welcome ${name} 🎉
            </h2>

            <p>
              Thank you for creating your account with us.
            </p>

            <p>
              We're excited to have you as part of
              our E-Commerce family.
            </p>

            <hr />

            <p>
              Happy Shopping ❤️
            </p>

            <p>
              <strong>Team E-Commerce</strong>
            </p>

          </div>
        </div>
      `,
    });

    console.log("✅ Welcome Email Sent");
    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Welcome Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Registration OTP Email
// ======================================================

export const sendRegistrationOtpEmail = async (
  email,
  otp
) => {
  try {
    console.log(
      "📧 Sending Registration OTP to:",
      email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: email,

      subject:
        "🔐 Verify Your E-Commerce Account",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            padding: 30px;
            background: #f5f5f5;
          "
        >

          <div
            style="
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 12px;
            "
          >

            <h2 style="color:#355E3B;">
              Verify Your Email 🔐
            </h2>

            <p>
              Thank you for creating an account
              with E-Commerce.
            </p>

            <p>
              Your verification OTP is:
            </p>

            <div
              style="
                text-align:center;
                margin:25px 0;
              "
            >

              <span
                style="
                  display:inline-block;
                  background:#f0fdf4;
                  color:#355E3B;
                  font-size:32px;
                  font-weight:bold;
                  font-weight:700;
                  letter-spacing:8px;
                  padding:15px 25px;
                  border-radius:8px;
                "
              >
                ${otp}
              </span>

            </div>

            <p>
              This OTP is valid for
              <strong>10 minutes</strong>.
            </p>

            <p>
              Please do not share this OTP
              with anyone.
            </p>

            <p>
              If you did not create this account,
              you can safely ignore this email.
            </p>

            <hr />

            <p>
              <strong>Team E-Commerce</strong>
            </p>

          </div>

        </div>
      `,
    });

    console.log(
      "✅ Registration OTP Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Registration OTP Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Login OTP Email
// ======================================================

export const sendLoginOtpEmail = async (
  email,
  otp
) => {
  try {
    console.log(
      "📧 Sending Login OTP to:",
      email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: email,

      subject:
        "🔐 Your E-Commerce Login OTP",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            padding: 30px;
            background: #f5f5f5;
          "
        >

          <div
            style="
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 12px;
            "
          >

            <h2 style="color:#355E3B;">
              Login Verification 🔐
            </h2>

            <p>
              We received a login request for
              your E-Commerce account.
            </p>

            <p>
              Your One-Time Password (OTP) is:
            </p>

            <div
              style="
                text-align:center;
                margin:25px 0;
              "
            >

              <span
                style="
                  display:inline-block;
                  background:#f0fdf4;
                  color:#355E3B;
                  font-size:32px;
                  font-weight:bold;
                  letter-spacing:8px;
                  padding:15px 25px;
                  border-radius:8px;
                "
              >
                ${otp}
              </span>

            </div>

            <p>
              This OTP is valid for
              <strong>10 minutes</strong>.
            </p>

            <p>
              Please do not share this OTP
              with anyone.
            </p>

            <p>
              If you did not try to login,
              please secure your account.
            </p>

            <hr />

            <p>
              <strong>Team E-Commerce</strong>
            </p>

          </div>

        </div>
      `,
    });

    console.log(
      "✅ Login OTP Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Login OTP Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Forgot Password OTP Email
// ======================================================

export const sendForgotPasswordOtpEmail = async (
  email,
  otp
) => {
  try {
    console.log(
      "📧 Sending Forgot Password OTP to:",
      email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: email,

      subject:
        "🔐 E-Commerce Password Reset OTP",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            padding: 30px;
            background: #f5f5f5;
          "
        >

          <div
            style="
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 12px;
            "
          >

            <h2 style="color:#355E3B;">
              Password Reset 🔐
            </h2>

            <p>
              We received a request to reset the
              password for your E-Commerce account.
            </p>

            <p>
              Your password reset OTP is:
            </p>

            <div
              style="
                text-align:center;
                margin:25px 0;
              "
            >

              <span
                style="
                  display:inline-block;
                  background:#f0fdf4;
                  color:#355E3B;
                  font-size:32px;
                  font-weight:bold;
                  letter-spacing:8px;
                  padding:15px 25px;
                  border-radius:8px;
                "
              >
                ${otp}
              </span>

            </div>

            <p>
              This OTP is valid for
              <strong>10 minutes</strong>.
            </p>

            <p>
              Please do not share this OTP
              with anyone.
            </p>

            <p>
              If you did not request a password
              reset, you can safely ignore this email.
            </p>

            <hr />

            <p>
              <strong>Team E-Commerce</strong>
            </p>

          </div>

        </div>
      `,
    });

    console.log(
      "✅ Forgot Password OTP Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Forgot Password OTP Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Order Confirmation Email
// ======================================================

export const sendOrderConfirmationEmail = async (
  user,
  order
) => {
  try {
    console.log(
      "📧 Sending Order Confirmation Email to:",
      user.email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,

      subject:
        "🛒 Your Order Has Been Confirmed",

      html: orderConfirmationEmail(
        order,
        user
      ),
    });

    console.log(
      "✅ Order Confirmation Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Order Confirmation Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Order Shipped Email
// ======================================================

export const sendShippedEmail = async (
  user,
  order
) => {
  try {
    console.log(
      "📦 Sending Shipped Email to:",
      user.email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,

      subject:
        "📦 Your Order Has Been Shipped",

      html: orderShippedEmail(
        order,
        user
      ),
    });

    console.log(
      "✅ Shipped Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Order Shipped Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Order Delivered Email
// ======================================================

export const sendDeliveredEmail = async (
  user,
  order
) => {
  try {
    console.log(
      "🎉 Sending Delivered Email to:",
      user.email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,

      subject:
        "🎉 Your Order Has Been Delivered",

      html: orderDeliveredEmail(
        order,
        user
      ),
    });

    console.log(
      "✅ Delivered Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Order Delivered Email Error:",
      error
    );

    throw error;
  }
};

// ======================================================
// Order Cancelled Email
// ======================================================

export const sendCancelledEmail = async (
  user,
  order
) => {
  try {
    console.log(
      "❌ Sending Cancelled Email to:",
      user.email
    );

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,

      subject:
        "❌ Your Order Has Been Cancelled",

      html: orderCancelledEmail(
        order,
        user
      ),
    });

    console.log(
      "✅ Cancelled Email Sent"
    );

    console.log(
      "📩 Message ID:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "❌ Order Cancelled Email Error:",
      error
    );

    throw error;
  }
};






