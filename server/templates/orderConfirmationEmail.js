const orderConfirmationEmail = (order, user) => {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">
          ${item.name}
        </td>

        <td style="padding:8px;border:1px solid #ddd;text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding:8px;border:1px solid #ddd;text-align:right;">
          ₹${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;padding:20px">

    <h2 style="color:#16a34a">
      Thank you for your order, ${user.name}! 🎉
    </h2>

    <p>
      Your order has been placed successfully.
    </p>

    <h3>Order Summary</h3>

    <table
      style="
      width:100%;
      border-collapse:collapse;
      "
    >
      <thead>
        <tr>
          <th style="border:1px solid #ddd;padding:8px">
            Product
          </th>

          <th style="border:1px solid #ddd;padding:8px">
            Qty
          </th>

          <th style="border:1px solid #ddd;padding:8px">
            Price
          </th>
        </tr>
      </thead>

      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <h3>
      Total : ₹${order.total}
    </h3>

    <p>
      We'll notify you once your order is shipped.
    </p>

    <hr>

    <small>
      Team E-Commerce
    </small>

  </div>
  `;
};

export default orderConfirmationEmail;