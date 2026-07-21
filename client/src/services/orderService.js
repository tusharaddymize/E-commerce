import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ============================
// Create Order
// ============================

export const placeOrder = async (orderData) => {
  const response = await API.post("/", orderData);
  return response.data;
};

// ============================
// Logged In User Orders
// ============================

export const getOrders = async () => {
  const response = await API.get("/my-orders");
  return response.data;
};

// ============================
// Single Order
// ============================

export const getOrderById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

// ============================
// Update Order
// ============================

export const updateOrder = async (id, data) => {
  const response = await API.put(`/${id}`, data);
  return response.data;
};

// ============================
// Cancel Order
// ============================

export const cancelOrder = async (id) => {
  const response = await API.put(`/${id}/cancel`);
  return response.data;
};

// ============================
// Delete Order
// ============================

export const deleteOrder = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};


// ============================
// Admin Orders (Search + Filter + Pagination)
// ============================

export const getAdminOrders = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
} = {}) => {
  const response = await API.get("/", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return response.data;
};

// ============================
// Admin Update Order Status
// ============================

export const updateOrderStatus = async (
  id,
  orderStatus,
  paymentStatus
) => {
  const response = await API.put(`/${id}`, {
    orderStatus,
    paymentStatus,
  });

  return response.data;
};

// ============================
// Admin Delete Order
// ============================

export const deleteAdminOrder = async (id) => {
  const response = await API.delete(`/${id}`);

  return response.data;
};