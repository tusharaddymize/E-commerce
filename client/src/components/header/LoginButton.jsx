import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiHeart,
  FiShoppingBag,
  FiUserCheck,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";

const LoginButton = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEsc
      );
  }, []);

  // ============================
  // Guest User
  // ============================

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="
        hidden
        lg:flex
        items-center
        gap-2
        px-4
        h-10
        rounded-xl
        border
        border-gray-300
        hover:bg-gray-100
        hover:border-[#355E3B]
        transition-all
        duration-300
        "
      >
        <FiUser size={18} />

        <span className="text-sm font-medium">
          Login
        </span>
      </Link>
    );
  }

  // ============================
  // Logged In User
  // ============================

  return (
    <div
      ref={dropdownRef}
      className="relative hidden lg:block"
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        flex
        items-center
        gap-3
        px-2
        py-1
        rounded-xl
        hover:bg-gray-100
        transition
        "
      >
        <div
          className="
          w-10
          h-10
          rounded-full
          bg-[#355E3B]
          text-white
          flex
          items-center
          justify-center
          font-bold
          uppercase
          "
        >
          {user?.name?.charAt(0)}
        </div>

        <div className="text-left">
          <p className="text-sm font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            My Account
          </p>
        </div>

        <FiChevronDown
          className={`transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
            absolute
            right-0
            mt-3
            w-64
            rounded-2xl
            border
            bg-white
            shadow-2xl
            overflow-hidden
            z-50
            "
          >
            <div className="px-5 py-4 border-b bg-gray-50">
              <h3 className="font-semibold">
                {user?.name}
              </h3>

              <p className="text-sm text-gray-500 truncate">
                {user?.email}
              </p>
            </div>

            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <FiUserCheck />

              My Profile
            </Link>

            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <FiShoppingBag />

              My Orders
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <FiHeart />

              Wishlist
            </Link>

            <div className="border-t" />

            <button
              onClick={handleLogout}
              className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              text-red-600
              hover:bg-red-50
              "
            >
              <FiLogOut />

              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginButton;