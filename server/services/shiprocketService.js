// ==========================================
// Shiprocket Service
// ==========================================

const SHIPROCKET_BASE_URL =
  "https://apiv2.shiprocket.in/v1/external";

// ==========================================
// Token Cache
// ==========================================

let shiprocketToken = null;
let tokenExpiresAt = null;

// ==========================================
// Generate Shiprocket Token
// ==========================================

const generateShiprocketToken = async () => {
  try {
    if (!process.env.SHIPROCKET_EMAIL) {
      throw new Error(
        "SHIPROCKET_EMAIL is missing in .env"
      );
    }

    if (!process.env.SHIPROCKET_PASSWORD) {
      throw new Error(
        "SHIPROCKET_PASSWORD is missing in .env"
      );
    }

    const response = await fetch(
      `${SHIPROCKET_BASE_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Shiprocket Authentication Error:",
        data
      );

      throw new Error(
        data?.message ||
          "Shiprocket authentication failed"
      );
    }

    if (!data?.token) {
      throw new Error(
        "Shiprocket token was not received"
      );
    }

    shiprocketToken = data.token;

    // Shiprocket documents token validity as 10 days.
    // We refresh slightly before expiry.
    tokenExpiresAt =
      Date.now() +
      9 * 24 * 60 * 60 * 1000;

    return shiprocketToken;
  } catch (error) {
    console.error(
      "Generate Shiprocket Token Error:",
      error
    );

    throw error;
  }
};

// ==========================================
// Get Valid Shiprocket Token
// ==========================================

const getShiprocketToken = async () => {
  if (
    shiprocketToken &&
    tokenExpiresAt &&
    Date.now() < tokenExpiresAt
  ) {
    return shiprocketToken;
  }

  return await generateShiprocketToken();
};

// ==========================================
// Check Pincode Serviceability
// ==========================================

export const checkPincodeServiceability = async (
  deliveryPincode,
  options = {}
) => {
  try {
    // ========================================
    // Validate Delivery Pincode
    // ========================================

    const cleanDeliveryPincode = String(
      deliveryPincode
    ).trim();

    if (
      !/^\d{6}$/.test(cleanDeliveryPincode)
    ) {
      throw new Error(
        "Invalid delivery pincode"
      );
    }

    // ========================================
    // Pickup Pincode
    // ========================================

    const pickupPincode = String(
      options.pickupPincode ||
        process.env.SHIPROCKET_PICKUP_POSTCODE ||
        ""
    ).trim();

    if (
      !/^\d{6}$/.test(pickupPincode)
    ) {
      throw new Error(
        "SHIPROCKET_PICKUP_POSTCODE is missing or invalid in .env"
      );
    }

    // ========================================
    // Shipment Details
    // ========================================

    const cod =
      options.cod === false ? 0 : 1;

    const weight =
      Number(options.weight) > 0
        ? Number(options.weight)
        : 0.5;

    // ========================================
    // Get Token
    // ========================================

    let token =
      await getShiprocketToken();

    // ========================================
    // Build Query Parameters
    // ========================================

    const params = new URLSearchParams({
      pickup_postcode: pickupPincode,
      delivery_postcode:
        cleanDeliveryPincode,
      cod: String(cod),
      weight: String(weight),
    });

    // ========================================
    // Shiprocket Serviceability API
    // ========================================

    let response = await fetch(
      `${SHIPROCKET_BASE_URL}/courier/serviceability/?${params.toString()}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ========================================
    // Token Expired
    // ========================================

    if (response.status === 401) {
      shiprocketToken = null;
      tokenExpiresAt = null;

      token =
        await generateShiprocketToken();

      response = await fetch(
        `${SHIPROCKET_BASE_URL}/courier/serviceability/?${params.toString()}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    // ========================================
    // Parse Response
    // ========================================

    const data = await response.json();

    // ========================================
    // Handle API Error
    // ========================================

    if (!response.ok) {
      console.error(
        "Shiprocket Serviceability Error:",
        data
      );

      throw new Error(
        data?.message ||
          "Unable to check delivery serviceability"
      );
    }

    // ========================================
    // Available Couriers
    // ========================================

    const couriers =
      data?.data
        ?.available_courier_companies || [];

    // ========================================
    // No Courier Available
    // ========================================

    if (
      !Array.isArray(couriers) ||
      couriers.length === 0
    ) {
      return {
        available: false,

        codAvailable: false,

        estimatedDelivery: null,

        deliveryCharge: 0,

        courierCount: 0,

        couriers: [],
      };
    }

    // ========================================
    // Find COD Supported Courier
    // ========================================

    const codCouriers = couriers.filter(
      (courier) =>
        Number(courier.cod) === 1
    );

    // ========================================
    // Best Courier
    // ========================================

    const sortedCouriers = [
      ...couriers,
    ].sort((a, b) => {
      const rateA =
        Number(a.rate ?? a.freight_charge ?? 0);

      const rateB =
        Number(b.rate ?? b.freight_charge ?? 0);

      return rateA - rateB;
    });

    const bestCourier =
      sortedCouriers[0];

    // ========================================
    // Delivery Charge
    // ========================================

    const deliveryCharge = Number(
      bestCourier?.rate ??
        bestCourier?.freight_charge ??
        0
    );

    // ========================================
    // Estimated Delivery
    // ========================================

    const estimatedDelivery =
      bestCourier?.estimated_delivery_days ||
      bestCourier?.etd ||
      null;

    // ========================================
    // Return Normalized Response
    // ========================================

    return {
      available: true,

      codAvailable:
        codCouriers.length > 0,

      estimatedDelivery,

      deliveryCharge,

      courierCount:
        couriers.length,

      recommendedCourier:
        data?.data
          ?.shiprocket_recommended_courier_id ||
        data?.data
          ?.recommended_courier_company_id ||
        null,

      couriers: couriers.map(
        (courier) => ({
          id:
            courier.courier_company_id ||
            courier.id,

          name:
            courier.courier_name || "",

          cod:
            Number(courier.cod) === 1,

          rate: Number(
            courier.rate ??
              courier.freight_charge ??
              0
          ),

          estimatedDelivery:
            courier.estimated_delivery_days ||
            courier.etd ||
            null,

          rating:
            Number(courier.rating) || 0,
        })
      ),
    };
  } catch (error) {
    console.error(
      "Check Pincode Serviceability Error:",
      error
    );

    throw error;
  }
};

// ==========================================
// Clear Token
// Useful for logout / testing
// ==========================================

export const clearShiprocketToken = () => {
  shiprocketToken = null;
  tokenExpiresAt = null;
};