import transporter from "../config/mail.js";

import orderConfirmationEmail from "../templates/orderConfirmationEmail.js";
import orderShippedEmail from "../templates/orderShippedEmail.js";
import orderDeliveredEmail from "../templates/orderDeliveredEmail.js";
import orderCancelledEmail from "../templates/orderCancelledEmail.js";

// ======================================================
// Welcome Email
// ======================================================

export const sendWelcomeEmail = async (name, email) => {
  try {
    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to E-Commerce",
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;">
          <div style="max-width:600px;margin:auto;background:#ffffff;padding:30px;border-radius:10px;">

            <h2 style="color:#16a34a;">
              Welcome ${name} 🎉
            </h2>

            <p>
              Thank you for creating your account with us.
            </p>

            <p>
              We're excited to have you as part of our E-Commerce family.
            </p>

            <hr>

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
    console.log("📩 Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Welcome Email Error");
    console.error(error);
  }
};


// ======================================================
// Order Confirmation Email
// ======================================================

export const sendOrderConfirmationEmail = async (user, order) => {
  try {
    console.log("📧 Sending Order Confirmation Email to:", user.email);

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🛒 Your Order Has Been Confirmed",
      html: orderConfirmationEmail(order, user),
    });

    console.log("✅ Order Confirmation Email Sent");
    console.log("📩 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Order Confirmation Email Error");
    console.error(error);

    throw error;
  }
};

// ======================================================
// Order Shipped Email
// ======================================================

export const sendShippedEmail = async (user, order) => {
  try {
    console.log("📦 Sending Shipped Email to:", user.email);

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "📦 Your Order Has Been Shipped",
      html: orderShippedEmail(order, user),
    });

    console.log("✅ Shipped Email Sent");
    console.log("📩 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Shipped Email Error");
    console.error(error);

    throw error;
  }
};

// ======================================================
// Order Delivered Email
// ======================================================

export const sendDeliveredEmail = async (user, order) => {
  try {
    console.log("🎉 Sending Delivered Email to:", user.email);

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🎉 Your Order Has Been Delivered",
      html: orderDeliveredEmail(order, user),
    });

    console.log("✅ Delivered Email Sent");
    console.log("📩 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Delivered Email Error");
    console.error(error);

    throw error;
  }
};

// ======================================================
// Order Cancelled Email
// ======================================================

export const sendCancelledEmail = async (user, order) => {
  try {
    console.log("❌ Sending Cancelled Email to:", user.email);

    const info = await transporter.sendMail({
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "❌ Your Order Has Been Cancelled",
      html: orderCancelledEmail(order, user),
    });

    console.log("✅ Cancelled Email Sent");
    console.log("📩 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Cancelled Email Error");
    console.error(error);

    throw error;
  }
};