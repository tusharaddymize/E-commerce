import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const {
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  const location = useLocation();

  // ==========================================
  // Authentication Check
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div
            className="
              h-12
              w-12
              border-4
              border-green-600
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-gray-600 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // No Authentication
  // ==========================================

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ==========================================
  // Email Verification Check
  // ==========================================

  if (user.isVerified !== true) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message:
            "Please verify your email before accessing your account.",
        }}
      />
    );
  }

  // ==========================================
  // Authenticated + Verified User
  // ==========================================

  return <Outlet />;
};

export default PrivateRoute;