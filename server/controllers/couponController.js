import Coupon from "../models/Coupon.js";

// ==========================================
// Create Coupon
// ==========================================

export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      usageLimit,
      expiryDate,
      isActive,
    } = req.body;

    const existingCoupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon already exists.",
      });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      usageLimit,
      expiryDate,
      isActive,
      createdBy: req.admin?._id || null,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Create Coupon Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create coupon.",
    });
  }
};

// ================part 3==========================
// Get All Coupons
// ==========================================

export const getCoupons = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.code = {
        $regex: search,
        $options: "i",
      };
    }

    const coupons = await Coupon.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCoupons = await Coupon.countDocuments(query);

    res.json({
      success: true,
      coupons,
      pagination: {
        totalCoupons,
        currentPage: page,
        totalPages: Math.ceil(totalCoupons / limit),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coupons.",
    });
  }
};

// ==========================================
// Get Coupon By ID
// ==========================================

export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    res.json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coupon.",
    });
  }
};

// ==========================================
// Update Coupon
// ==========================================

export const updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        code: req.body.code?.toUpperCase(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCoupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    res.json({
      success: true,
      message: "Coupon updated successfully.",
      coupon: updatedCoupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update coupon.",
    });
  }
};

// ==========================================
// Delete Coupon
// ==========================================

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    res.json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete coupon.",
    });
  }
};

// ==========================================
// Toggle Coupon Status
// ==========================================

export const toggleCouponStatus = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found.",
      });
    }

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    res.json({
      success: true,
      message: `Coupon ${
        coupon.isActive ? "activated" : "deactivated"
      } successfully.`,
      coupon,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update coupon status.",
    });
  }
};
// ==========================================
// Apply Coupon
// ==========================================

export const applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code || !orderAmount) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and order amount are required.",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase().trim(),
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code.",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "Coupon is inactive.",
      });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired.",
      });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached.",
      });
    }

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}.`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (orderAmount * coupon.discountValue) / 100;

      if (
        coupon.maxDiscount > 0 &&
        discount > coupon.maxDiscount
      ) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    if (discount > orderAmount) {
      discount = orderAmount;
    }

    const finalAmount = orderAmount - discount;

 res.status(200).json({
      success: true,
      message: "Coupon applied successfully.",
      coupon: {
        id: coupon._id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      discount,
      finalAmount,
    });
  } catch (error) {
    console.error("Apply Coupon Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to apply coupon.",
    });
  }
};

// ==========================================
// Coupon Analytics
// ==========================================

export const getCouponAnalytics = async (req, res) => {
  try {
    const totalCoupons = await Coupon.countDocuments();

    const activeCoupons = await Coupon.countDocuments({
      isActive: true,
      expiryDate: { $gte: new Date() },
    });

    const inactiveCoupons = await Coupon.countDocuments({
      isActive: false,
    });

    const expiredCoupons = await Coupon.countDocuments({
      expiryDate: { $lt: new Date() },
    });

    const totalUsage = await Coupon.aggregate([
      {
        $group: {
          _id: null,
          used: {
            $sum: "$usedCount",
          },
        },
      },
    ]);

    const totalRemaining = await Coupon.aggregate([
      {
        $project: {
          remaining: {
            $subtract: ["$usageLimit", "$usedCount"],
          },
        },
      },
      {
        $group: {
          _id: null,
          remaining: {
            $sum: "$remaining",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalCoupons,
        activeCoupons,
        inactiveCoupons,
        expiredCoupons,
        totalUsage:
          totalUsage.length > 0
            ? totalUsage[0].used
            : 0,
        remainingUsage:
          totalRemaining.length > 0
            ? totalRemaining[0].remaining
            : 0,
      },
    });
  } catch (error) {
    console.error("Coupon Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coupon analytics.",
    });
  }
};