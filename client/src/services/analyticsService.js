import API from "./api";

// =======================================
// Get Product Analytics
// =======================================

export const getProductAnalytics = async () => {
  const { data } = await API.get("/admin/analytics");

  return data;
};