import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiLock,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const menu = [
  {
    title: "My Profile",
    path: "/profile",
    icon: <FiUser />,
  },
  {
    title: "My Orders",
    path: "/orders",
    icon: <FiShoppingBag />,
  },
  {
    title: "Addresses",
    path: "/addresses",
    icon: <FiMapPin />,
  },
  {
    title: "Change Password",
    path: "/change-password",
    icon: <FiLock />,
  },
  {
    title: "Account Settings",
    path: "/account-settings",
    icon: <FiSettings />,
  },
];

const ProfileSidebar = () => {
  return (
    <aside className="bg-white rounded-2xl shadow border p-5">

      <h2 className="text-2xl font-bold mb-6">
        My Account
      </h2>

      <nav className="space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#355E3B] text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}

      </nav>

      <button className="flex items-center gap-3 mt-8 text-red-600 font-semibold">
        <FiLogOut />
        Logout
      </button>

    </aside>
  );
};

export default ProfileSidebar;