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

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  // ==========================================
  // Close Dropdown On Outside Click
  // ==========================================

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

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // Close Dropdown On Escape
  // ==========================================

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEsc
      );
    };
  }, []);

  // ==========================================
  // Guest User
  // ==========================================

if (!isAuthenticated) {
  return (
    <>
      {/* ====================================== */}
      {/* Mobile + Tablet Login */}
      {/* ====================================== */}

      <Link
        to="/login"
        className="
          lg:hidden
          flex
          flex-col
          items-center
          justify-center
          gap-0.5

          text-gray-800

          transition-colors
          duration-200

          hover:text-[var(--primary-color)]
        "
      >
        <FiUser size={21} />

<span className="text-[10px] sm:text-xs font-medium">
  Login
</span>
      </Link>

      {/* ====================================== */}
      {/* Desktop Login */}
      {/* ====================================== */}

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

          text-gray-800

          transition-all
          duration-300

          hover:bg-gray-50
          hover:text-[var(--primary-color)]
          hover:border-[var(--primary-color)]
        "
      >
        <FiUser size={18} />

        <span className="text-sm font-medium">
          Login
        </span>
      </Link>
    </>
  );
}
  // ==========================================
  // Logged In User
  // ==========================================

return (
  <>
    {/* ====================================== */}
    {/* Mobile + Tablet Profile */}
    {/* ====================================== */}

    <Link
      to="/profile"
      className="
        lg:hidden
        flex
        flex-col
        items-center
        justify-center
        gap-0.5

        text-gray-800

        transition-colors
        duration-200

        hover:text-[var(--primary-color)]
      "
    >
      <div className="relative">
        <FiUser size={21} />

        {/* Logged In Indicator */}

        <span
          className="
            absolute
            -top-1
            -right-1

            w-2
            h-2

            rounded-full

            bg-[var(--primary-color)]
          "
        />
      </div>

      <span className="text-[10px] sm:text-xs font-medium">
        You
      </span>
    </Link>

    {/* ====================================== */}
    {/* Desktop Account */}
    {/* ====================================== */}

    <div
      ref={dropdownRef}
      className="relative hidden lg:block"
    >



      
      {/* ====================================== */}
      {/* Account Button */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          flex
          items-center
          gap-3

          px-2
          py-1

          rounded-xl

          hover:bg-gray-100

          transition-all
          duration-300
        "
      >
        {/* User Avatar */}

        <div
          className="
            w-10
            h-10

            rounded-full

            bg-[var(--primary-color)]

            text-white

            flex
            items-center
            justify-center

            font-bold
            uppercase

            transition-colors
            duration-300
          "
        >
          {user?.name?.charAt(0) || (
            <FiUser size={18} />
          )}
        </div>

        {/* User Info */}

        <div className="text-left">
          <p className="text-sm font-semibold text-gray-900">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            My Account
          </p>
        </div>

        {/* Arrow */}

        <FiChevronDown
          className={`
            transition
            duration-300
            ${
              open
                ? "rotate-180 text-[var(--primary-color)]"
                : "text-gray-600"
            }
          `}
        />
      </button>

      {/* ====================================== */}
      {/* Dropdown */}
      {/* ====================================== */}

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
              border-gray-200

              bg-white

              shadow-2xl

              overflow-hidden

              z-50
            "
          >
            {/* User Header */}

            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                {user?.name}
              </h3>

              <p className="text-sm text-gray-500 truncate">
                {user?.email}
              </p>
            </div>

            {/* Profile */}

            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3

                px-5
                py-3

                text-gray-700

                hover:bg-gray-50
                hover:text-[var(--primary-color)]

                transition-colors
                duration-200
              "
            >
              <FiUserCheck />

              My Profile
            </Link>

            {/* Orders */}

            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3

                px-5
                py-3

                text-gray-700

                hover:bg-gray-50
                hover:text-[var(--primary-color)]

                transition-colors
                duration-200
              "
            >
              <FiShoppingBag />

              My Orders
            </Link>

            {/* Wishlist */}

            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3

                px-5
                py-3

                text-gray-700

                hover:bg-gray-50
                hover:text-[var(--primary-color)]

                transition-colors
                duration-200
              "
            >
              <FiHeart />

              Wishlist
            </Link>

            <div className="border-t border-gray-200" />

            {/* Logout */}

            <button
              type="button"
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

                transition-colors
                duration-200
              "
            >
              <FiLogOut />

              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>
);
};

export default LoginButton;