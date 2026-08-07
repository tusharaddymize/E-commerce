import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  BarChart3,
  Globe,
  X,
  Zap,
  TicketPercent,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const AdminSidebar = ({
  isOpen,
  setIsOpen,
}) => {
  const { logout } = useAdmin();

  // ==========================================
  // Admin Menu
  // ==========================================

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
    {
      name: "Website Settings",
      icon: <Globe size={20} />,
      path: "/admin/website-settings",
    },
    {
      name: "Flash Deals",
      icon: <Zap size={20} />,
      path: "/admin/flash-deals",
    },
    {
      name: "Coupons",
      icon: <TicketPercent size={20} />,
      path: "/admin/coupons",
    },
    {
      name: "Categories",
      icon: <Package size={20} />,
      path: "/admin/categories",
    },
 
  ];

  return (
    <>
      {/* ====================================== */}
      {/* Mobile Overlay */}
      {/* ====================================== */}

      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="
            fixed
            inset-0
            z-40

            bg-black/40

            lg:hidden
          "
        />
      )}

      {/* ====================================== */}
      {/* Fixed Admin Sidebar */}
      {/* ====================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          bottom-0

          z-50

          w-72
          h-screen

          flex
          flex-col

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
        `}
      >
        {/* ================================== */}
        {/* Sidebar Header */}
        {/* ================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            flex-shrink-0

            px-6
            py-5

            border-b
            border-green-600
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Admin Panel
            </h2>

            <p
              className="
                text-xs
                text-green-200
                mt-1
              "
            >
              Management System
            </p>
          </div>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={() =>
              setIsOpen(false)
            }
            className="
              lg:hidden

              p-2

              rounded-lg

              hover:bg-white/10

              transition
            "
            aria-label="Close Sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* ================================== */}
        {/* Scrollable Navigation */}
        {/* ================================== */}

        <nav
          className="
            flex-1

            min-h-0

            py-5

            overflow-y-auto
            overflow-x-hidden
          "
        >
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() =>
                setIsOpen(false)
              }
              className={({
                isActive,
              }) => `
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
                    ? `
                      bg-white
                      text-green-700
                      shadow-lg
                    `
                    : `
                      text-white
                      hover:bg-green-600/70
                    `
                }
              `}
            >
              {/* Icon */}

              <span
                className="
                  flex-shrink-0
                "
              >
                {menu.icon}
              </span>

              {/* Menu Name */}

              <span
                className="
                  font-medium
                  whitespace-nowrap
                "
              >
                {menu.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* ================================== */}
        {/* Logout */}
        {/* ================================== */}

        <div
          className="
            flex-shrink-0

            border-t
            border-green-600

            p-4

            bg-green-900/40
          "
        >
          <button
            type="button"
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

              transition-colors
              duration-200
            "
          >
            <LogOut size={20} />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;