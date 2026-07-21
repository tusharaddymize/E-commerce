import API from "./api";

// =======================================
// Dashboard Overview
// =======================================

export const getDashboardOverview = async () => {
  const { data } = await API.get(
    "/admin/dashboard"
  );

  return data;
};

// =======================================
// Revenue Analytics
// (Phase 21.2)
// =======================================

export const getRevenueAnalytics = async () => {
  const { data } = await API.get(
    "/admin/dashboard/revenue"
  );

  return data;
};

// =======================================
// Sales Analytics
// (Phase 21.3)
// =======================================

export const getSalesAnalytics = async () => {
  const { data } = await API.get(
    "/admin/dashboard/sales"
  );

  return data;
};

// =======================================
// Inventory Analytics
// (Phase 21.4)
// =======================================

export const getInventoryAnalytics = async () => {
  const { data } = await API.get(
    "/admin/dashboard/inventory"
  );

  return data;
};

// =======================================
// Customer Analytics
// (Phase 21.5)
// =======================================

export const getCustomerAnalytics = async () => {
  const { data } = await API.get(
    "/admin/dashboard/customers"
  );

  return data;
};

// =======================================
// Order Analytics
// (Phase 21.6)
// =======================================

export const getOrderAnalytics = async () => {
  const { data } = await API.get(
    "/admin/dashboard/orders"
  );

  return data;
};

// =======================================
// Product Analytics
// (Future Phase)
// =======================================

export const getProductAnalytics = async () => {
  const { data } = await API.get(
    "/admin/analytics"
  );

  return data;
};

// =======================================
// User Analytics
// (Future Phase)
// =======================================

export const getUserAnalytics = async () => {
  const { data } = await API.get(
    "/admin/dashboard/users"
  );

  return data;
};