import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiUser,
  FiLock,
  // FiSettings,
  FiLogOut,
} from "react-icons/fi";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ==========================================
  // Menu
  // ==========================================

  const menuItems = [
    {
      title: "Dashboard",
      path: "/profile",
      icon: FiHome,
    },
    {
      title: "My Orders",
      path: "/orders",
      icon: FiShoppingBag,
    },
    {
      title: "Wishlist",
      path: "/wishlist",
      icon: FiHeart,
    },
    {
      title: "Addresses",
      path: "/profile#addresses",
      icon: FiMapPin,
    },
    {
      title: "Profile Details",
      path: "/edit-profile",
      icon: FiUser,
    },
    {
      title: "Change Password",
      path: "/profile#change-password",
      icon: FiLock,
    },
    // {
    //   title: "Account Settings",
    //   path: "/profile#account-settings",
    //   icon: FiSettings,
    // },
  ];

  return (
    <aside
      className="
        hidden
        md:block

        bg-white

        rounded-2xl
        border
        border-gray-200

        shadow-sm

        overflow-hidden

        sticky
        top-40
      "
    >
      {/* ====================================== */}
      {/* Menu */}
      {/* ====================================== */}

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) => `
                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-xl

                text-sm
                font-medium

                transition-all
                duration-200

                ${
                  isActive &&
                  item.path === "/profile"
                    ? `
                      bg-[var(--primary-color,#355E3B)]/10
                      text-[var(--primary-color,#355E3B)]
                    `
                    : `
                      text-gray-600
                      hover:bg-gray-50
                      hover:text-[var(--primary-color,#355E3B)]
                    `
                }
              `}
            >
              <Icon className="text-lg shrink-0" />

              <span>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* ====================================== */}
      {/* Divider */}
      {/* ====================================== */}

      <div className="mx-4 border-t border-gray-200" />

      {/* ====================================== */}
      {/* Logout */}
      {/* ====================================== */}

      <div className="p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full

            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            text-sm
            font-semibold
            text-red-600

            transition-all
            duration-200

            hover:bg-red-50
          "
        >
          <FiLogOut className="text-lg" />

          Logout
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;