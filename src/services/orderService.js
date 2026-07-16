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