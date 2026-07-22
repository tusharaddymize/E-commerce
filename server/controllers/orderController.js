import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

import { createNotification } from "../utils/notificationService.js";
import sendLowStockEmail from "../utils/sendLowStockEmail.js";


import {
  sendOrderConfirmationEmail,
  sendShippedEmail,
  sendDeliveredEmail,
  sendCancelledEmail,
} from "../services/emailServices.js";
// ===============================
// Create Order
// ===============================
export const createOrder = async (req, res) => {
  try {



    console.log("========= ORDER REQUEST =========");
console.log("User:", req.user);
console.log("Body:", req.body);
console.log("Payment Method:", req.body.paymentMethod);
console.log("=================================");
const {
  items,
  shippingAddress,
  paymentMethod,
  subtotal,
  shipping,
  gst,
  discount,
  total,
} = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

const orderItems = items.map((item) => ({
  productId: item.productId || item._id,
  title: item.title,
  image: item.image || item.thumbnail, // ✅ thumbnail ko image me save karo
  quantity: item.quantity,
  price: item.price,
  selectedColor: item.selectedColor || "",
  selectedSize: item.selectedSize || "",
}));

const order = await Order.create({
  userId: req.user._id,
  items: orderItems,
  shippingAddress,
  paymentMethod,
  subtotal,
  shipping,
  gst,
  discount,
  total,
});

// ===============================
// Update Product Stock & Sold Count
// ===============================
// for (const item of items) {
//   const product = await Product.findById(item.productId);

//   if (!product) continue;

//   // Stock Update
//   product.stock -= item.quantity;

//   if (product.stock < 0) {
//     product.stock = 0;
//   }

//   // Sold Count Update
//   product.sold += item.quantity;

//   await product.save();

//   // ===============================
//   // Low Stock Notification
//   // ===============================
//   if (product.stock <= 10) {
//     await createNotification({
//       title: "⚠️ Low Stock",
//       message: `${product.name} has only ${product.stock} items remaining.`,
//       type: "low_stock",
//       referenceId: product._id,
//     });

//     await sendLowStockEmail(product);
//   }
// }
for (const item of items) {
  const productId = item.productId || item._id;

  console.log("=================================");
  console.log("Searching Product ID:", productId);

  const product = await Product.findById(productId);

  console.log("Product Found:", product);

  if (!product) {
    console.log("❌ Product Not Found");
    continue;
  }

  console.log("Current Stock:", product.stock);

  product.stock -= item.quantity;

  if (product.stock < 0) {
    product.stock = 0;
  }

  product.sold += item.quantity;

  await product.save();

  console.log("Updated Stock:", product.stock);

if (product.stock <= 10) {
  await createNotification({
    title: "⚠️ Low Stock",
    message: `${product.title} has only ${product.stock} items remaining.`,
    type: "low_stock",
    referenceId: product._id,
  });

  // Email disabled
  // await sendLowStockEmail(product);
}
}

// ===============================
// Send Order Confirmation Email
// ===============================

const user = await User.findById(req.user._id);

// await sendOrderConfirmationEmail(
//   user,
//   order
// );

res.status(201).json({
  success: true,
  message: "Order placed successfully.",
  order,
});
} catch (error) {
  console.error("========== ORDER ERROR ==========");
  console.error(error);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);

  if (error.response) {
    console.error(error.response);
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}

}; // ✅ Ye line missing hai

// ===============================
// Get All Orders
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";

    const skip = (page - 1) * limit;

    const query = {};

    // Status Filter
    if (status) {
      query.orderStatus = status;
    }

    // Search by User Name / Email
    const orders = await Order.find(query)
      .populate({
        path: "userId",
        select: "name email",
        match: search
          ? {
              $or: [
                {
                  name: {
                    $regex: search,
                    $options: "i",
                  },
                },
                {
                  email: {
                    $regex: search,
                    $options: "i",
                  },
                },
              ],
            }
          : {},
      })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    // Remove unmatched users
    const filteredOrders = orders.filter(
      (order) => order.userId
    );

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      success: true,

      orders: filteredOrders,

      page,

      limit,

      totalOrders,

      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Order
// ===============================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Order Status
// ===============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    // ===============================
    // Send Email Based On Order Status
    // ===============================

    const user = await User.findById(order.userId);

    if (user) {

      // Order Confirmed
      if (order.orderStatus === "Processing") {
        await sendOrderConfirmationEmail(user, order);
      }

      // Shipped
if (order.orderStatus === "Shipped") {
    await sendShippedEmail(user, order);
}

if (order.orderStatus === "Delivered") {
  await sendDeliveredEmail(user, order);
}

      // Cancelled
if (order.orderStatus === "Cancelled") {
  await sendCancelledEmail(user, order);
}
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===============================
// Cancel Order
// ===============================
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (
      order.orderStatus !== "Pending" &&
      order.orderStatus !== "Processing"
    ) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled.",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Order
// ===============================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Get Logged In User Orders
// ===============================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};