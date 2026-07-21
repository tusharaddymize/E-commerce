


import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";




// ==========================================
// Dashboard Overview
// GET /api/admin/dashboard
// ==========================================

export const getDashboardOverview = async (req, res) => {
  try {
    // ===============================
    // Total Counts
    // ===============================

    const [
      totalProducts,
      totalUsers,
      totalOrders,
    ] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
    ]);

    // ===============================
    // Total Revenue (Paid Orders)
    // ===============================

    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalRevenue =
      revenue.length > 0 ? revenue[0].totalRevenue : 0;

    // ===============================
    // Today's Orders
    // ===============================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayOrders = await Order.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // ===============================
    // Order Status Counts
    // ===============================

    const [
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    ] = await Promise.all([
      Order.countDocuments({
        orderStatus: "Pending",
      }),

      Order.countDocuments({
        orderStatus: "Processing",
      }),

      Order.countDocuments({
        orderStatus: "Shipped",
      }),

      Order.countDocuments({
        orderStatus: "Delivered",
      }),

      Order.countDocuments({
        orderStatus: "Cancelled",
      }),
    ]);

    // ===============================
    // Response
    // ===============================

    res.status(200).json({
      success: true,

      overview: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
        todayOrders,

        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard overview.",
    });
  }
};

// ==========================================
// Revenue Analytics
// GET /api/admin/dashboard/revenue
// ==========================================

export const getRevenueAnalytics = async (req, res) => {
  try {
    const now = new Date();

    // Today
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Week
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    // Month
    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // Year
    const yearStart = new Date(
      now.getFullYear(),
      0,
      1
    );

    const getRevenue = async (startDate) => {
      const result = await Order.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
            createdAt: {
              $gte: startDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            revenue: {
              $sum: "$total",
            },
          },
        },
      ]);

      return result.length
        ? result[0].revenue
        : 0;
    };

    const [
      todayRevenue,
      weeklyRevenue,
      monthlyRevenue,
      yearlyRevenue,
    ] = await Promise.all([
      getRevenue(todayStart),
      getRevenue(weekStart),
      getRevenue(monthStart),
      getRevenue(yearStart),
    ]);
        // ===============================
    // Monthly Revenue Chart
    // ===============================

    const monthlyRevenueData = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
          createdAt: {
            $gte: new Date(now.getFullYear(), 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyChart = months.map((month, index) => {
      const found = monthlyRevenueData.find(
        (item) => item._id.month === index + 1
      );

      return {
        month,
        revenue: found ? found.revenue : 0,
      };
    });

    // ===============================
    // Response
    // ===============================

    res.status(200).json({
      success: true,

      todayRevenue,
      weeklyRevenue,
      monthlyRevenue,
      yearlyRevenue,

      monthlyChart,
    });
  } catch (error) {
    console.error("Revenue Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load revenue analytics.",
    });
  }
};

// ==========================================
// Sales Analytics
// GET /api/admin/dashboard/sales
// ==========================================

export const getSalesAnalytics = async (req, res) => {
  try {
    // ===============================
    // Summary
    // ===============================

    const totalOrders = await Order.countDocuments();

    const paidOrders = await Order.countDocuments({
      paymentStatus: "Paid",
    });

    const salesResult = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    const averageOrderValue =
      totalOrders > 0
        ? Number((totalSales / totalOrders).toFixed(2))
        : 0;

            // ===============================
    // Order Status
    // ===============================

    const [
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
    ] = await Promise.all([
      Order.countDocuments({
        orderStatus: "Pending",
      }),
      Order.countDocuments({
        orderStatus: "Processing",
      }),
      Order.countDocuments({
        orderStatus: "Shipped",
      }),
      Order.countDocuments({
        orderStatus: "Delivered",
      }),
      Order.countDocuments({
        orderStatus: "Cancelled",
      }),
    ]);

    // ===============================
    // Monthly Sales Chart
    // ===============================

    const currentYear = new Date().getFullYear();

    const monthlySalesData = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          sales: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const salesChart = monthNames.map((month, index) => {
      const found = monthlySalesData.find(
        (item) => item._id.month === index + 1
      );

      return {
        month,
        sales: found ? found.sales : 0,
      };
    });

    // ===============================
    // Top Selling Products
    // ===============================

    const topProducts = await Product.find({})
      .sort({ sold: -1 })
      .limit(5)
      .select(
        "title category thumbnail sold price"
      );

    const formattedTopProducts =
      topProducts.map((product) => ({
        _id: product._id,
        name: product.title,
        category: product.category,
        image: product.thumbnail,
        sold: product.sold,
        revenue: product.sold * product.price,
        progress: Math.min(product.sold, 100),
      }));

    // ===============================
    // Recent Orders
    // ===============================

    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({
        createdAt: -1,
      })
      .limit(10);

    const formattedRecentOrders =
      recentOrders.map((order) => ({
        _id: order._id,
        total: order.total,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        user: {
          name:
            order.userId?.name ||
            "Customer",
          email:
            order.userId?.email || "",
        },
      }));

    // ===============================
    // Response
    // ===============================

    res.status(200).json({
      success: true,

      totalSales,
      totalOrders,
      paidOrders,
      averageOrderValue,

      orderStatus: {
        pending,
        processing,
        shipped,
        delivered,
        cancelled,
      },

      salesChart,

      topProducts:
        formattedTopProducts,

      recentOrders:
        formattedRecentOrders,
    });
  } catch (error) {
    console.error(
      "Sales Analytics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load sales analytics.",
    });
  }
};



// ==========================================
// Inventory Analytics
// GET /api/admin/dashboard/inventory
// ==========================================

export const getInventoryAnalytics = async (req, res) => {
  try {
    // ======================================
    // Inventory Summary
    // ======================================

    const totalProducts = await Product.countDocuments();

    const products = await Product.find().select(
      "title category price stock sold thumbnail"
    );

    const totalStock = products.reduce(
      (sum, product) => sum + (product.stock || 0),
      0
    );

    const lowStockProducts = products.filter(
      (product) => product.stock > 0 && product.stock <= 10
    );

    const outOfStockProducts = products.filter(
      (product) => product.stock === 0
    );

    const totalInventoryValue = products.reduce(
      (sum, product) =>
        sum + (product.price || 0) * (product.stock || 0),
      0
    );

    // ======================================
    // Category Wise Stock
    // ======================================

    const categoryMap = {};

    products.forEach((product) => {
      const category = product.category || "Other";

      if (!categoryMap[category]) {
        categoryMap[category] = 0;
      }

      categoryMap[category] += product.stock || 0;
    });

    const categoryStock = Object.keys(categoryMap).map((key) => ({
      category: key,
      stock: categoryMap[key],
    }));
        // ======================================
    // Stock Status Chart
    // ======================================

    const stockStatus = [
      {
        name: "In Stock",
        value: products.filter((product) => product.stock > 10).length,
      },
      {
        name: "Low Stock",
        value: lowStockProducts.length,
      },
      {
        name: "Out Of Stock",
        value: outOfStockProducts.length,
      },
    ];

    // ======================================
    // Top Stock Products
    // ======================================

    const topInventoryProducts = [...products]
      .sort((a, b) => (b.stock || 0) - (a.stock || 0))
      .slice(0, 5)
      .map((product) => ({
        _id: product._id,
        name: product.title,
        category: product.category,
        image: product.thumbnail,
        stock: product.stock,
        sold: product.sold,
        price: product.price,
        inventoryValue: (product.price || 0) * (product.stock || 0),
      }));

    // ======================================
    // Lowest Stock Products
    // ======================================

    const lowestStockProducts = [...products]
      .sort((a, b) => (a.stock || 0) - (b.stock || 0))
      .slice(0, 5)
      .map((product) => ({
        _id: product._id,
        name: product.title,
        category: product.category,
        image: product.thumbnail,
        stock: product.stock,
        sold: product.sold,
        price: product.price,
        inventoryValue: (product.price || 0) * (product.stock || 0),
      }));

    // ======================================
    // Response
    // ======================================

    res.status(200).json({
      success: true,

      totalProducts,
      totalStock,

      lowStockCount: lowStockProducts.length,
      outOfStockCount: outOfStockProducts.length,

      totalInventoryValue,

      categoryStock,

      stockStatus,

      topInventoryProducts,

      lowestStockProducts,
    });
      } catch (error) {
    console.error(
      "Inventory Analytics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load inventory analytics.",
    });
  }
};



// ==========================================
// Customer Analytics
// GET /api/admin/dashboard/customers
// ==========================================

export const getCustomerAnalytics = async (req, res) => {
  try {
    // ======================================
    // Total Customers
    // ======================================

    const totalCustomers = await User.countDocuments();

    // ======================================
    // Last 30 Days
    // ======================================

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const newCustomers = await User.countDocuments({
      createdAt: {
        $gte: last30Days,
      },
    });

    // ======================================
    // Customer Orders
    // ======================================

    const customerOrders = await Order.aggregate([
      {
        $group: {
          _id: "$userId",

          totalSpent: {
            $sum: "$total",
          },

          totalOrders: {
            $sum: 1,
          },

          lastOrder: {
            $max: "$createdAt",
          },
        },
      },
    ]);

    const repeatCustomers = customerOrders.filter(
      (customer) => customer.totalOrders > 1
    ).length;

    const totalCustomerSpending = customerOrders.reduce(
      (sum, customer) => sum + customer.totalSpent,
      0
    );

    const averageCustomerValue =
      customerOrders.length > 0
        ? Number(
            (
              totalCustomerSpending /
              customerOrders.length
            ).toFixed(2)
          )
        : 0;
            // ======================================
    // Top Customers
    // ======================================

    const topCustomerData = await Order.aggregate([
      {
        $group: {
          _id: "$userId",

          totalSpent: {
            $sum: "$total",
          },

          totalOrders: {
            $sum: 1,
          },

          lastOrder: {
            $max: "$createdAt",
          },
        },
      },
      {
        $sort: {
          totalSpent: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const topCustomers = await Promise.all(
      topCustomerData.map(async (customer) => {
        const user = await User.findById(
          customer._id
        ).select("name email");

        return {
          _id: customer._id,
          name: user?.name || "Unknown User",
          email: user?.email || "",
          totalSpent: customer.totalSpent,
          totalOrders: customer.totalOrders,
          lastOrder: customer.lastOrder,
        };
      })
    );

    // ======================================
    // Monthly Customer Growth
    // ======================================

    const currentYear = new Date().getFullYear();

    const monthlyCustomerData = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          customers: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const customerGrowth = months.map(
      (month, index) => {
        const found =
          monthlyCustomerData.find(
            (item) =>
              item._id.month === index + 1
          );

        return {
          month,
          customers: found
            ? found.customers
            : 0,
        };
      }
    );

    // ======================================
    // Response
    // ======================================

    res.status(200).json({
      success: true,

      totalCustomers,

      newCustomers,

      repeatCustomers,

      totalCustomerSpending,

      averageCustomerValue,

      topCustomers,

      customerGrowth,
    });

  } catch (error) {
    console.error(
      "Customer Analytics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load customer analytics.",
    });
  }
};


// ==========================================
// Order Analytics
// GET /api/admin/dashboard/orders
// ==========================================

export const getOrderAnalytics = async (req, res) => {
  try {
    // ======================================
    // Summary
    // ======================================

    const totalOrders = await Order.countDocuments();

    const totalRevenueResult = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0
        ? totalRevenueResult[0].revenue
        : 0;

    const averageOrderValue =
      totalOrders > 0
        ? Number(
            (totalRevenue / totalOrders).toFixed(2)
          )
        : 0;

    // ======================================
    // Order Status Counts
    // ======================================

    const [
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    ] = await Promise.all([
      Order.countDocuments({
        orderStatus: "Pending",
      }),

      Order.countDocuments({
        orderStatus: "Processing",
      }),

      Order.countDocuments({
        orderStatus: "Shipped",
      }),

      Order.countDocuments({
        orderStatus: "Delivered",
      }),

      Order.countDocuments({
        orderStatus: "Cancelled",
      }),
    ]);
        // ======================================
    // Monthly Orders Trend
    // ======================================

    const currentYear = new Date().getFullYear();

    const monthlyOrdersData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const ordersChart = months.map((month, index) => {
      const found = monthlyOrdersData.find(
        (item) => item._id.month === index + 1
      );

      return {
        month,
        orders: found ? found.orders : 0,
      };
    });

    // ======================================
    // Payment Method Analytics
    // ======================================

    const paymentMethodData = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          value: {
            $sum: 1,
          },
        },
      },
    ]);

    const paymentMethods = paymentMethodData.map(
      (item) => ({
        name: item._id || "Unknown",
        value: item.value,
      })
    );

    // ======================================
    // Order Status Chart
    // ======================================

    const orderStatusChart = [
      {
        name: "Pending",
        value: pendingOrders,
      },
      {
        name: "Processing",
        value: processingOrders,
      },
      {
        name: "Shipped",
        value: shippedOrders,
      },
      {
        name: "Delivered",
        value: deliveredOrders,
      },
      {
        name: "Cancelled",
        value: cancelledOrders,
      },
    ];
        // ======================================
    // Recent Orders
    // ======================================

    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedRecentOrders = recentOrders.map(
      (order) => ({
        _id: order._id,

        customer: {
          name: order.userId?.name || "Unknown Customer",
          email: order.userId?.email || "",
        },

        total: order.total,

        paymentMethod: order.paymentMethod,

        paymentStatus: order.paymentStatus,

        orderStatus: order.orderStatus,

        createdAt: order.createdAt,
      })
    );

    // ======================================
    // Response
    // ======================================

    res.status(200).json({
      success: true,

      totalOrders,

      totalRevenue,

      averageOrderValue,

      pendingOrders,

      processingOrders,

      shippedOrders,

      deliveredOrders,

      cancelledOrders,

      ordersChart,

      paymentMethods,

      orderStatusChart,

      recentOrders: formattedRecentOrders,
    });

  } catch (error) {
    console.error(
      "Order Analytics Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load order analytics.",
    });
  }
};