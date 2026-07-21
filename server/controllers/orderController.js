import Order from "../models/Order.js";
import Product from "../models/Product.js";

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

const order = await Order.create({
  userId: req.user._id,
  items,
  shippingAddress,
  paymentMethod,
  subtotal,
  shipping,
  gst,
  discount,
  total,
});

// Update Product Stock & Sold Count
for (const item of items) {
  await Product.findByIdAndUpdate(item.productId, {
    $inc: {
      stock: -item.quantity,
      sold: item.quantity,
    },
  });
}



    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error(error);
    console.error("Validation Errors:", error.errors);

    res.status(500).json({
      success: false,
      message: "Failed to place order.",
      error: error.message,
    });
  }
};

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