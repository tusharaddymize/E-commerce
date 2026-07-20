import { Bell, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <NavLink
          to="/admin/notifications"
          className="hover:text-green-600 transition-colors"
        >
          <Bell size={22} />
        </NavLink>

        <NavLink
          to="/admin/profile"
          className="hover:text-green-600 transition-colors"
        >
          <UserCircle size={34} />
        </NavLink>

      </div>
    </header>
  );
};

export default AdminNavbar;