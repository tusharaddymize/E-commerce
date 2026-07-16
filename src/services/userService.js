import API from "./api";

// ===============================
// Update Profile
// ===============================
export const updateProfile = async (formData) => {
  const { data } = await API.put(
    "/users/profile",
    formData
  );

  return data;
};

// ===============================
// Upload Avatar
// ===============================
export const uploadAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const { data } = await API.put(
    "/users/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};