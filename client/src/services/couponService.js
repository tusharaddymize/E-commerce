import API from "./api";

// ==========================================
// Get All Coupons
// ==========================================

export const getCoupons = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  try {
    const { data } = await API.get("/coupons", {
      params: {
        page,
        limit,
        search,
      },
    });

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch coupons.",
      }
    );
  }
};

// ==========================================
// Get Coupon By ID
// ==========================================

export const getCouponById = async (id) => {
  try {
    const { data } = await API.get(`/coupons/${id}`);

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch coupon.",
      }
    );
  }
};

// ==========================================
// Create Coupon
// ==========================================

export const createCoupon = async (couponData) => {
  try {
    const { data } = await API.post(
      "/coupons",
      couponData
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to create coupon.",
      }
    );
  }
};

// ==========================================
// Update Coupon
// ==========================================

export const updateCoupon = async (
  id,
  couponData
) => {
  try {
    const { data } = await API.put(
      `/coupons/${id}`,
      couponData
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to update coupon.",
      }
    );
  }
};

// ==========================================
// Delete Coupon
// ==========================================

export const deleteCoupon = async (id) => {
  try {
    const { data } = await API.delete(
      `/coupons/${id}`
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to delete coupon.",
      }
    );
  }
};

// ==========================================
// Toggle Coupon Status
// ==========================================

export const toggleCouponStatus = async (id) => {
  try {
    const { data } = await API.patch(
      `/coupons/status/${id}`
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to update coupon status.",
      }
    );
  }
};

// ==========================================
// Apply Coupon
// ==========================================

export const applyCoupon = async (
  code,
  orderAmount
) => {
  try {
    const { data } = await API.post(
      "/coupons/apply",
      {
        code,
        orderAmount,
      }
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to apply coupon.",
      }
    );
  }
};

// ==========================================
// Coupon Analytics
// ==========================================

export const getCouponAnalytics = async () => {
  try {
    const { data } = await API.get(
      "/coupons/analytics"
    );

    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message:
          "Failed to fetch coupon analytics.",
      }
    );
  }
};