import Product from "../models/Product.js";
import { checkPincodeServiceability } from "../services/shiprocketService.js";

// ==========================================
// Check Product Delivery Availability
// ==========================================

export const checkDeliveryAvailability = async (req, res) => {
  try {
    const {
      productId,
      pincode,
      state,
    } = req.body;

    // ========================================
    // Validation
    // ========================================

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!pincode) {
      return res.status(400).json({
        success: false,
        message: "Pincode is required",
      });
    }

    // ========================================
    // Validate Pincode
    // ========================================

    const cleanPincode = String(pincode).trim();

    if (!/^\d{6}$/.test(cleanPincode)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit pincode",
      });
    }

    // ========================================
    // Find Product
    // ========================================

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ========================================
    // Product Delivery Settings
    // ========================================

    const delivery = product.delivery || {};

    // ========================================
    // Product Delivery Completely Disabled
    // ========================================

    if (delivery.available === false) {
      return res.status(200).json({
        success: true,
        available: false,
        reason: "PRODUCT_NOT_AVAILABLE",
        message: "This product is currently not available for delivery.",
      });
    }

    // ========================================
    // Check Restricted State
    // ========================================

    const normalizedState = state
      ? String(state).trim().toLowerCase()
      : "";

    const restrictedStates = Array.isArray(
      delivery.restrictedStates
    )
      ? delivery.restrictedStates
      : [];

    const isStateRestricted = restrictedStates.some(
      (restrictedState) =>
        String(restrictedState).trim().toLowerCase() ===
        normalizedState
    );

    if (normalizedState && isStateRestricted) {
      return res.status(200).json({
        success: true,
        available: false,
        reason: "STATE_NOT_SERVICEABLE",
        message: `This product cannot be delivered to ${state}.`,
      });
    }

    // ========================================
    // Check Restricted Pincode
    // ========================================

    const restrictedPincodes = Array.isArray(
      delivery.restrictedPincodes
    )
      ? delivery.restrictedPincodes
      : [];

    const isPincodeRestricted = restrictedPincodes.some(
      (restrictedPincode) =>
        String(restrictedPincode).trim() === cleanPincode
    );

    if (isPincodeRestricted) {
      return res.status(200).json({
        success: true,
        available: false,
        reason: "PINCODE_NOT_SERVICEABLE",
        message: `This product cannot be delivered to pincode ${cleanPincode}.`,
      });
    }

    // ========================================
    // Shiprocket Serviceability Check
    // ========================================

    const serviceability =
      await checkPincodeServiceability(cleanPincode);

    // ========================================
    // Courier Not Available
    // ========================================

    if (!serviceability.available) {
      return res.status(200).json({
        success: true,
        available: false,
        reason: "COURIER_NOT_SERVICEABLE",
        message:
          "Delivery is not available at this pincode.",
      });
    }

    // ========================================
    // Delivery Available
    // ========================================

    return res.status(200).json({
      success: true,
      available: true,
      reason: "DELIVERY_AVAILABLE",
      message: "Delivery is available at this location.",

      data: {
        productId: product._id,
        productTitle: product.title,
        pincode: cleanPincode,
        codAvailable:
          delivery.codAvailable !== false &&
          serviceability.codAvailable !== false,

        estimatedDelivery:
          serviceability.estimatedDelivery || null,

        deliveryCharge:
          serviceability.deliveryCharge || 0,
      },
    });
  } catch (error) {
    console.error(
      "Check Delivery Availability Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while checking delivery availability.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};