import Product from "../models/Product.js";

// =====================================
// Product Analytics
// =====================================

export const getProductAnalytics = async (req, res) => {
  try {
    // Total Products
    const totalProducts = await Product.countDocuments();

    // Active Products
    const activeProducts = await Product.countDocuments({
      status: "active",
    });

    // Draft Products
    const draftProducts = await Product.countDocuments({
      status: "draft",
    });

    // Featured Products
    const featuredProducts = await Product.countDocuments({
      isFeatured: true,
    });

    // Trending Products
    const trendingProducts = await Product.countDocuments({
      isTrending: true,
    });

    // Low Stock
    const lowStockProducts = await Product.countDocuments({
      stock: {
        $gt: 0,
        $lte: 10,
      },
    });

    // Out Of Stock
    const outOfStockProducts = await Product.countDocuments({
      stock: 0,
    });

    // Inventory Value
    const inventory = await Product.find(
      {},
      "price stock"
    );

    const inventoryValue = inventory.reduce(
      (total, item) => total + item.price * item.stock,
      0
    );

    // Categories
    const categoryAnalytics = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalProducts: -1,
        },
      },
    ]);

    // Recent Products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      totalProducts,

      activeProducts,

      draftProducts,

      featuredProducts,

      trendingProducts,

      lowStockProducts,

      outOfStockProducts,

      inventoryValue,

      categoryAnalytics,

      recentProducts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load analytics.",
    });
  }
};