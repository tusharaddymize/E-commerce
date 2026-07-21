import {
  Bell,
  UserCircle,
  Search,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="hidden sm:block text-sm text-gray-500">
              Welcome back, Admin 👋
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products, orders..."
              className="
                w-full
                pl-10
                pr-4
                py-2.5
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
                focus:border-transparent
              "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notifications */}
          <NavLink
            to="/admin/notifications"
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition"
          >
            <Bell size={22} />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/admin/profile"
            className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-gray-100 transition"
          >
            <UserCircle
              size={38}
              className="text-green-700"
            />

            <div className="hidden lg:block">
              <h4 className="text-sm font-semibold text-slate-800">
                Admin
              </h4>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

          </NavLink>

        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;