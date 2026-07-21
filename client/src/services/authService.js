import API from "./api";

// ==============================
// Register User
// ==============================
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// ==============================
// Login User
// ==============================
export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// ==============================
// Get Current Logged In User
// ==============================
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  // Authorization header automatically api.js interceptor add karega
  const { data } = await API.get("/auth/me");

  return data;
};

// ==============================
// Logout
// ==============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ==============================
// Get Token
// ==============================
export const getToken = () => {
  return localStorage.getItem("token");
};

// ==============================
// Get Stored User
// ==============================
export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// ==============================
// Check Authentication
// ==============================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default API;