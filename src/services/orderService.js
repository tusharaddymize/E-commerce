import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

// Create Order
export const placeOrder = async (orderData) => {
  const response = await API.post("/", orderData);
  return response.data;
};

// Get All Orders
export const getOrders = async () => {
  const response = await API.get("/");
  return response.data;
};

// Get Single Order
export const getOrderById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

// Update Order
export const updateOrder = async (id, data) => {
  const response = await API.put(`/${id}`, data);
  return response.data;
};

// Delete Order
export const deleteOrder = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};