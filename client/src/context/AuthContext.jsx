import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  getStoredUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  // ===============================
  // Auto Login on Refresh
  // ===============================
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auto Login Error:", error);
        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ===============================
  // Login
  // ===============================
  const login = async (formData) => {
    const data = await loginUser(formData);

    if (data?.user) {
      setUser(data.user);
    }

    return data;
  };

  // ===============================
  // Register
  // ===============================
  const register = async (formData) => {
    const data = await registerUser(formData);

    if (data?.user) {
      setUser(data.user);
    }

    return data;
  };

  // ===============================
  // Logout
  // ===============================
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
  <AuthContext.Provider
  value={{
    user,
    setUser,
    loading,

    login,
    register,
    logout,

    isAuthenticated: !!user,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;