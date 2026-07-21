import API from "./api";

// ======================================
// Get Admin Profile
// ======================================

export const getAdminProfile = async () => {
  const { data } = await API.get("/admin/profile");
  return data;
};

// ======================================
// Update Admin Profile
// ======================================

export const updateAdminProfile = async (profileData) => {
  const { data } = await API.put(
    "/admin/profile",
    profileData
  );

  return data;
};

// ======================================
// Upload Admin Avatar
// ======================================

export const uploadAdminAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const { data } = await API.post(
    "/admin/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ======================================
// Change Password
// ======================================

export const changeAdminPassword = async (passwordData) => {
  const { data } = await API.put(
    "/admin/change-password",
    passwordData
  );

  return data;
};

// ======================================
// Notification Settings
// ======================================

export const getNotificationSettings = async () => {
  const { data } = await API.get(
    "/admin/notifications"
  );

  return data;
};

export const updateNotificationSettings = async (
  settings
) => {
  const { data } = await API.put(
    "/admin/notifications",
    settings
  );

  return data;
};

// ======================================
// Logout From All Devices
// ======================================

export const logoutAllDevices = async () => {
  const { data } = await API.post(
    "/admin/logout-all"
  );

  return data;
};

// ======================================
// Delete Admin Account
// ======================================

export const deleteAdminAccount = async () => {
  const { data } = await API.delete(
    "/admin/profile"
  );

  return data;
};