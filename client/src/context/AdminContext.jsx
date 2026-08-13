import {
  createContext,
  useContext,
  useState,
} from "react";

const AdminContext = createContext(null);

// ==========================================
// Admin Provider
// ==========================================

export const AdminProvider = ({ children }) => {
  // ==========================================
  // Get Saved Admin
  // ==========================================

  const getStoredAdmin = () => {
    try {
      const storedAdmin =
        localStorage.getItem("admin");

      if (!storedAdmin) {
        return null;
      }

      return JSON.parse(storedAdmin);
    } catch (error) {
      console.error(
        "Invalid admin data:",
        error
      );

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");

      return null;
    }
  };

  // ==========================================
  // Admin State
  // ==========================================

  const [admin, setAdmin] = useState(
    getStoredAdmin
  );

  // ==========================================
  // Admin Token State
  // ==========================================

  const [adminToken, setAdminToken] =
    useState(
      () =>
        localStorage.getItem(
          "adminToken"
        ) || null
    );

  // ==========================================
  // Admin Login
  // ==========================================

const login = (data) => {
  if (!data) {
    return;
  }

  // ==========================================
  // Get Admin Data
  // ==========================================

  const adminData =
    data.admin ||
    data.user ||
    data;

  // ==========================================
  // Get Token
  // ==========================================

  const token =
    data.token ||
    data.adminToken ||
    data.accessToken ||
    data.data?.token ||
    data.data?.adminToken ||
    data.data?.accessToken ||
    null;

  // ==========================================
  // Debug
  // ==========================================

  console.log("ADMIN LOGIN RESPONSE:", data);
  console.log("ADMIN TOKEN:", token);
  console.log("ADMIN DATA:", adminData);

  // ==========================================
  // Save Admin
  // ==========================================

  if (adminData) {
    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );
  }

  // ==========================================
  // Save Admin Token
  // ==========================================

  if (token) {
    localStorage.setItem(
      "adminToken",
      token
    );
  }

  // ==========================================
  // Update React State
  // ==========================================

  setAdmin(adminData);
  setAdminToken(token);
};

  // ==========================================
  // Admin Logout
  // ==========================================

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem(
      "adminToken"
    );

    setAdmin(null);
    setAdminToken(null);
  };

  // ==========================================
  // Context
  // ==========================================

  return (
    <AdminContext.Provider
      value={{
        admin,
        adminToken,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// ==========================================
// useAdmin Hook
// ==========================================

export const useAdmin = () => {
  const context =
    useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider"
    );
  }

  return context;
};