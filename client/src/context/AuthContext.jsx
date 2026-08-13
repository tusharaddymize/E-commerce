import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  verifyLoginOtp,

  registerUser,
  verifyRegistrationOtp,

  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,

  logoutUser,
  getCurrentUser,
  getStoredUser,
} from "../services/authService";

const AuthContext = createContext();

// ======================================================
// Auth Provider
// ======================================================

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getStoredUser());

  const [loading, setLoading] = useState(true);

  // ======================================================
  // Central User Setter
  // ======================================================
  // Whenever user changes:
  // 1. React state updates
  // 2. localStorage updates
  //
  // This keeps Profile + Edit Profile + Refresh
  // synchronized.
  // ======================================================

  const setUser = (updatedUser) => {
    setUserState(updatedUser);

    if (updatedUser) {
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } else {
      localStorage.removeItem("user");
    }
  };

  // ======================================================
  // Auto Login on Refresh
  // ======================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken =
          localStorage.getItem("token");

        // No token means user is not logged in
        if (!storedToken) {
          setUser(null);
          return;
        }

        const data = await getCurrentUser();

        if (data?.user) {
          setUser(data.user);
        } else {
          logoutUser();
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Auto Login Error:",
          error
        );

        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ======================================================
  // Login
  // ======================================================

  const login = async (formData) => {
    const data = await loginUser(formData);

    // Token is NOT saved here.
    // Backend first sends Login OTP.
    //
    // Token will be saved after:
    // verifyOtp()

    return data;
  };

  // ======================================================
  // Verify Login OTP
  // ======================================================

  const verifyOtp = async (email, otp) => {
    const data = await verifyLoginOtp(
      email,
      otp
    );

    // OTP verified successfully
    // authService saves token + user

    if (data?.user) {
      setUser(data.user);
    }

    return data;
  };

  // ======================================================
  // Register
  // ======================================================

  const register = async (formData) => {
    const data = await registerUser(formData);

    // Registration does NOT authenticate user.
    // User must first verify OTP.

    return data;
  };

  // ======================================================
  // Verify Registration OTP
  // ======================================================

  const verifyRegisterOtp = async (
    email,
    otp
  ) => {
    const data =
      await verifyRegistrationOtp(
        email,
        otp
      );

    // OTP verified
    // authService saves token + user

    if (data?.user) {
      setUser(data.user);
    }

    return data;
  };

  // ======================================================
  // Forgot Password
  // ======================================================

  const forgotPasswordRequest = async (
    email
  ) => {
    const data = await forgotPassword(email);

    return data;
  };

  // ======================================================
  // Verify Forgot Password OTP
  // ======================================================

  const verifyForgotOtp = async (
    email,
    otp
  ) => {
    const data =
      await verifyForgotPasswordOtp(
        email,
        otp
      );

    return data;
  };

  // ======================================================
  // Reset Password
  // ======================================================

  const resetUserPassword = async ({
    email,
    otp,
    newPassword,
  }) => {
    const data = await resetPassword({
      email,
      otp,
      newPassword,
    });

    return data;
  };

  // ======================================================
  // Logout
  // ======================================================

  const logout = () => {
    logoutUser();

    setUser(null);
  };

  // ======================================================
  // Context Provider
  // ======================================================

  return (
    <AuthContext.Provider
      value={{
        // User
        user,
        setUser,

        // Loading
        loading,

        // Authentication
        login,
        verifyOtp,

        // Registration
        register,
        verifyRegisterOtp,

        // Forgot Password
        forgotPassword:
          forgotPasswordRequest,

        verifyForgotOtp,

        resetUserPassword,

        // Logout
        logout,

        // Authentication status
        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ======================================================
// Named Hook Export
// ======================================================

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// ======================================================
// Default Export
// ======================================================

export default AuthContext;