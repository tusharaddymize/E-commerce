import axios from "axios";

// ==========================================
// Axios Instance
// ==========================================

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ==========================================
// Admin API Routes
// ==========================================
//
// In routes par adminToken use hoga.
//
// IMPORTANT:
// Agar backend coupon route "/coupons" hai,
// to "/coupons" bhi yahan hona zaroori hai.
// ==========================================

const ADMIN_ROUTES = [
  "/admin",

  "/coupons",
  "/website-settings",
  "/flash-deals",
  "/categories",
  "/filters",
  "/menu-groups",
  "/sub-categories",

  // Admin Dashboard Analytics
  "/dashboard",
  "/revenue",
  "/sales",
  "/inventory",
  "/customers",
];

// ==========================================
// Check Admin Request
// ==========================================

const isAdminRequest = (url = "") => {
  return ADMIN_ROUTES.some((route) => {
    return (
      url === route ||
      url.startsWith(`${route}/`) ||
      url.includes(`${route}/`)
    );
  });
};

// ==========================================
// Request Interceptor
// ==========================================

API.interceptors.request.use(
  (config) => {
    // ======================================
    // Get Tokens
    // ======================================

    const userToken =
      localStorage.getItem("token");

    const adminToken =
      localStorage.getItem("adminToken");

    // ======================================
    // Current URL
    // ======================================

    const url = config.url || "";

    // ======================================
    // Determine Request Type
    // ======================================

    const adminRequest =
      isAdminRequest(url);

    // ======================================
    // Select Token
    // ======================================

    const token = adminRequest
      ? adminToken
      : userToken;

    // ======================================
    // Debug
    // ======================================
    // Development me check kar sakte ho
    // ki kaunsa token use ho raha hai.
    // ======================================

    if (import.meta.env.DEV) {
      console.log(
        "🔐 API Request:",
        url,
        "| Admin:",
        adminRequest,
        "| Token:",
        token ? "YES" : "NO"
      );
    }

    // ======================================
    // Attach Authorization
    // ======================================

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// Response Interceptor
// ==========================================

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // ======================================
    // Request Information
    // ======================================

    const url =
      error.config?.url || "";

    const status =
      error.response?.status;

    // ======================================
    // Determine Admin Request
    // ======================================

    const adminRequest =
      isAdminRequest(url);

    // ======================================
    // Admin Authentication Failed
    // ======================================

    if (
      adminRequest &&
      (status === 401 ||
        status === 403)
    ) {
      console.error(
        "❌ Admin authentication failed:",
        url
      );

      localStorage.removeItem(
        "admin"
      );

      localStorage.removeItem(
        "adminToken"
      );

      // ====================================
      // Redirect only from admin pages
      // ====================================

      if (
        window.location.pathname.startsWith(
          "/admin"
        ) &&
        !window.location.pathname.includes(
          "/admin/login"
        )
      ) {
        window.location.href =
          "/admin/login";
      }
    }

    // ======================================
    // Normal User Authentication Failed
    // ======================================

    if (
      !adminRequest &&
      status === 401
    ) {
      // User authentication errors
      // are handled by individual pages.
    }

    return Promise.reject(error);
  }
);

// ==========================================
// Export
// ==========================================

export default API;