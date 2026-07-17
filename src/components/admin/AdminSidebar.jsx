import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const AdminSidebar = () => {
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
    <aside className="w-64 bg-green-700 text-white min-h-screen">

      <div className="text-2xl font-bold p-6 border-b">
        Admin Panel
      </div>

      <nav className="mt-6">

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 hover:bg-green-600 ${
                isActive ? "bg-green-900" : ""
              }`
            }
          >
            {menu.icon}

            {menu.name}

          </NavLink>

        ))}

      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-6 py-4 w-full hover:bg-red-600 mt-auto"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
};

export default AdminSidebar;