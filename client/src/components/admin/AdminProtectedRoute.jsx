import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const AdminProtectedRoute = () => {
  const { admin } = useAdmin();
  const location = useLocation();

  // Admin login nahi hai
  if (!admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Admin login hai
  return <Outlet />;
};

export default AdminProtectedRoute;