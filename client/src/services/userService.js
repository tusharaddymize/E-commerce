import API from "./api";

// ===============================
// Update Profile
// ===============================
export const updateProfile = async (profileData) => {
  const { data } = await API.put("/users/profile", profileData);
  return data;
};

// ===============================
// Upload Avatar
// ===============================
export const uploadAvatar = async (formData) => {
  const { data } = await API.put("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// ===============================
// Admin - Get All Users
// ===============================
export const getAllUsers = async ({
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  const { data } = await API.get("/users/admin/all", {
    params: {
      page,
      limit,
      search,
    },
  });

  return data;
};

// ===============================
// Admin - Get User Details
// ===============================
export const getUserById = async (id) => {
  const { data } = await API.get(`/users/admin/${id}`);
  return data;
};

// ===============================
// Admin - Update User Role
// ===============================
export const updateUserRole = async (id, role) => {
  const { data } = await API.put(`/users/admin/${id}/role`, {
    role,
  });

  return data;
};

// ===============================
// Admin - Block / Unblock User
// ===============================
export const toggleUserBlock = async (id) => {
  const { data } = await API.put(`/users/admin/${id}/block`);
  return data;
};

// ===============================
// Admin - Delete User
// ===============================
export const deleteUser = async (id) => {
  const { data } = await API.delete(`/users/admin/${id}`);
  return data;
};