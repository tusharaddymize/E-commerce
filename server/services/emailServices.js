import transporter from "../config/mail.js";

// ==========================================
// Common Email Sender
// ==========================================

// ==========================================
// Welcome Email
// ==========================================

export const sendWelcomeEmail = async (email, name) => {
  return await sendEmail({
    to: email,
    subject: "Welcome to Our Store 🎉",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
      ">

        <h2>
          Welcome ${name}! 🎉
        </h2>

        <p>
          Your account has been successfully verified.
        </p>

        <p>
          Thank you for joining our store.
        </p>

        <p>
          We are happy to have you with us.
        </p>

      </div>
    `,
  });
};

// ==========================================
// Order Delivered Email
// ==========================================

export const sendDeliveredEmail = async (
  email,
  name,
  orderId
) => {
  return await sendEmail({
    to: email,
    subject: "Your Order Has Been Delivered 🎉",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2 style="color: #355E3B;">
          Order Delivered 🎉
        </h2>

        <p>
          Hello <strong>${name}</strong>,
        </p>

        <p>
          Your order has been successfully delivered.
        </p>

        <p>
          <strong>Order ID:</strong> ${orderId}
        </p>

        <p>
          Thank you for shopping with us.
        </p>

        <hr />

        <p style="color: #777;">
          E-Commerce Store
        </p>

      </div>
    `,
  });
};

// ==========================================
// Order Cancelled Email
// ==========================================

export const sendCancelledEmail = async (
  email,
  name,
  orderId
) => {
  return await sendEmail({
    to: email,
    subject: "Order Cancelled - E-Commerce Store",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2 style="color: #d32f2f;">
          Order Cancelled
        </h2>

        <p>
          Hello <strong>${name}</strong>,
        </p>

        <p>
          Your order has been successfully cancelled.
        </p>

        <p>
          <strong>Order ID:</strong> ${orderId}
        </p>

        <p>
          If you did not request this cancellation,
          please contact our support team.
        </p>

        <hr />

        <p style="color: #777;">
          E-Commerce Store
        </p>

      </div>
    `,
  });
};


// ==========================================
// Order Confirmation Email
// ==========================================

export const sendOrderConfirmationEmail = async (
  email,
  name,
  orderId
) => {
  return await sendEmail({
    to: email,

    subject: "Order Confirmation - E-Commerce Store 🎉",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2 style="color: #355E3B;">
          Order Confirmed 🎉
        </h2>

        <p>
          Hello <strong>${name}</strong>,
        </p>

        <p>
          Thank you for your order!
        </p>

        <p>
          Your order has been successfully placed.
        </p>

        <div style="
          background: #f3f4f6;
          padding: 15px;
          margin: 20px 0;
          border-radius: 8px;
        ">
          <strong>Order ID:</strong> ${orderId}
        </div>

        <p>
          We will keep you updated about your order status.
        </p>

        <hr />

        <p style="color: #777;">
          E-Commerce Store
        </p>

      </div>
    `,
  });
};


// ==========================================
// Order Shipped Email
// ==========================================

export const sendShippedEmail = async (
  email,
  name,
  orderId
) => {
  return await sendEmail({
    to: email,

    subject: "Your Order Has Been Shipped 📦",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2 style="color: #355E3B;">
          Your Order Has Been Shipped 📦
        </h2>

        <p>
          Hello <strong>${name}</strong>,
        </p>

        <p>
          Great news! Your order has been shipped.
        </p>

        <div style="
          background: #f3f4f6;
          padding: 15px;
          margin: 20px 0;
          border-radius: 8px;
        ">
          <strong>Order ID:</strong> ${orderId}
        </div>

        <p>
          Your order is now on its way to you.
        </p>

        <p>
          Thank you for shopping with us.
        </p>

        <hr />

        <p style="color: #777;">
          E-Commerce Store
        </p>

      </div>
    `,
  });
};