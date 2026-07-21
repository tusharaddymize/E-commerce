import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  BarChart3,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAdmin();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Add Product",
      icon: <Package size={20} />,
      path: "/admin/add-product",
    },
    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/admin/analytics",
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-gradient-to-b
          from-green-700
          to-green-900
          text-white
          shadow-2xl
          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
          lg:flex
          lg:flex-col
          lg:w-72
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-600">

          <div>
            <h2 className="text-2xl font-bold">
              Admin Panel
            </h2>

            <p className="text-xs text-green-200 mt-1">
              Management System
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">

          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                mx-4
                mb-2
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-white text-green-700 shadow-lg"
                    : "hover:bg-green-600/70"
                }
              `
              }
            >
              {menu.icon}

              <span className="font-medium">
                {menu.name}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* Logout */}
        <div className="border-t border-green-600 p-4">

          <button
            onClick={logout}
            className="
              flex
              items-center
              gap-3
              w-full
              px-4
              py-3
              rounded-xl
              bg-red-500
              hover:bg-red-600
              transition
            "
          >
            <LogOut size={20} />

            Logout
          </button>

        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;