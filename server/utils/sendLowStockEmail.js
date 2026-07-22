import transporter from "../config/mail.js";

const sendLowStockEmail = async (product) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: `⚠️ Low Stock Alert - ${product.name}`,

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
            <h2 style="color:#e53935">
                ⚠️ Low Stock Alert
            </h2>

            <p>
                The following product is running low.
            </p>

            <table
                cellpadding="8"
                cellspacing="0"
                border="1"
                style="border-collapse:collapse"
            >
                <tr>
                    <td><strong>Product</strong></td>
                    <td>${product.name}</td>
                </tr>

                <tr>
                    <td><strong>Remaining Stock</strong></td>
                    <td>${product.stock}</td>
                </tr>
            </table>

            <br/>

            <p style="color:#d32f2f">
                Please restock this product as soon as possible.
            </p>
        </div>
      `,
    });

    console.log("✅ Low Stock Email Sent");
  } catch (error) {
    console.log("❌ Low Stock Email Error");
    console.log(error.message);
  }
};

export default sendLowStockEmail;