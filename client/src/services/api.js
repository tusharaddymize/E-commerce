import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

// ===================================
// Request Interceptor
// ===================================

API.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    // Admin API routes
    const isAdminRequest =
      config.url?.startsWith("/admin");

    const token = isAdminRequest
      ? adminToken
      : userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===================================
// Response Interceptor
// ===================================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || "";

      // =============================
      // Admin Unauthorized
      // =============================

      if (requestUrl.startsWith("/admin")) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }

      // =============================
      // User Unauthorized
      // =============================

      else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;