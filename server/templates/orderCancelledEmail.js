const orderCancelledEmail = (order, user) => {
  return `
  <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:10px;">

      <h2 style="color:#dc2626;">
        ❌ Your Order Has Been Cancelled
      </h2>

      <p>Hello <strong>${user.name}</strong>,</p>

      <p>
        We regret to inform you that your order has been cancelled.
      </p>

      <hr>

      <h3>Order Details</h3>

      <p><strong>Order ID:</strong> ${order._id}</p>

      <p><strong>Status:</strong> ${order.orderStatus}</p>

      <p><strong>Total:</strong> ₹${order.total}</p>

      <hr>

      <p>
        If you have already made a payment, the refund (if applicable) will be processed according to our refund policy.
      </p>

      <p>
        For any questions, please contact our support team.
      </p>

    </div>
  </div>
  `;
};

export default orderCancelledEmail;