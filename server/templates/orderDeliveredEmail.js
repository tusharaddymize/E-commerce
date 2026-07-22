const orderDeliveredEmail = (order, user) => {
  return `
  <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:10px;">

      <h2 style="color:#16a34a;">
        🎉 Your Order Has Been Delivered
      </h2>

      <p>Hello <strong>${user.name}</strong>,</p>

      <p>
        Your order has been successfully delivered.
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

      <p>
        We hope you enjoy your purchase. We'd love to serve you again!
      </p>

    </div>
  </div>
  `;
};

export default orderDeliveredEmail;