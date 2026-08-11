import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAdmin } from "../../context/AdminContext";

const AdminProtectedRoute = () => {
  const {
    admin,
    adminToken,
  } = useAdmin();

  const location =
    useLocation();

  // ==========================================
  // Admin Authentication Check
  // ==========================================

  const isAdminAuthenticated =
    Boolean(admin && adminToken);

  // ==========================================
  // Admin Not Logged In
  // ==========================================

  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ==========================================
  // Admin Logged In
  // ==========================================

  return <Outlet />;
};

export default AdminProtectedRoute;