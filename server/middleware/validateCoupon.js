const validateCoupon = (req, res, next) => {
  const {
    code,
    discountType,
    discountValue,
    usageLimit,
    expiryDate,
  } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({
      success: false,
      message: "Coupon code is required.",
    });
  }

  if (!["percentage", "fixed"].includes(discountType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid discount type.",
    });
  }

  if (!discountValue || discountValue <= 0) {
    return res.status(400).json({
      success: false,
      message: "Discount value must be greater than 0.",
    });
  }

  if (!usageLimit || usageLimit <= 0) {
    return res.status(400).json({
      success: false,
      message: "Usage limit must be greater than 0.",
    });
  }

  if (!expiryDate) {
    return res.status(400).json({
      success: false,
      message: "Expiry date is required.",
    });
  }

  next();
};

export default validateCoupon;