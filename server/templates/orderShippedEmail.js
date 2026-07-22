const orderShippedEmail = (order, user) => {
  return `
  <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:10px;">

      <h2 style="color:#2563eb;">
        📦 Your Order Has Been Shipped
      </h2>

      <p>Hello <strong>${user.name}</strong>,</p>

      <p>
        Great news! Your order has been shipped and is on its way.
      </p>

      <hr>

      <h3>Order Details</h3>

      <p><strong>Order ID:</strong> ${order._id}</p>

      <p><strong>Status:</strong> ${order.orderStatus}</p>

      <p><strong>Total:</strong> ₹${order.total}</p>

      <hr>

      <p>
        Thank you for shopping with us ❤️
      </p>

    </div>
  </div>
  `;
};

export default orderShippedEmail;