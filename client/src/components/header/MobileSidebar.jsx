import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiChevronDown,
  FiChevronRight,
  FiHome,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiShoppingBag,
  FiSettings,
  FiMapPin,
  FiGift,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

import { useCategory } from "../../context/CategoryContext";
import MobileProfile from "./MobileProfile";

const MobileSidebar = ({
  open,
  closeSidebar,
}) => {
  const [activeMenu, setActiveMenu] =
    useState(null);

    const {
  categories,
  menuGroups,
  subCategories,
} = useCategory();

const navigationData = useMemo(() => {
  return categories
    .filter(
      (category) => category.isActive !== false
    )
    .map((category) => {
      const sections = menuGroups
        .filter(
          (group) =>
            group.category?._id === category._id &&
            group.isActive !== false
        )
        .sort(
          (a, b) =>
            (a.sortOrder || 0) -
            (b.sortOrder || 0)
        )
        .map((group) => {
          const items = subCategories
            .filter(
              (sub) =>
                sub.menuGroup?._id === group._id &&
                sub.isActive !== false
            )
            .sort(
              (a, b) =>
                (a.sortOrder || 0) -
                (b.sortOrder || 0)
            )
            .map((sub) => ({
              name: sub.name,
              slug: sub.slug,
              categorySlug: category.slug,
              menuGroupSlug: group.slug,
            }));

          return {
            title: group.name,
            slug: group.slug,
            items,
          };
        })
        .filter(
          (section) => section.items.length > 0
        );

      return {
        id: category._id,
        title: category.name,
        path: `/category/${category.slug}`,
        megaMenu: sections.length > 0,
        sections,
      };
    });
}, [
  categories,
  menuGroups,
  subCategories,
]);

  if (!open) return null;

  // ==========================================
  // Quick Links
  // ==========================================

  const quickLinks = [
    {
      title: "Home",
      icon: <FiHome size={24} />,
      path: "/",
    },
    {
      title: "Profile",
      icon: <FiUser size={24} />,
      path: "/profile",
    },
    {
      title: "Wishlist",
      icon: <FiHeart size={24} />,
      path: "/wishlist",
    },
    {
      title: "Cart",
      icon: <FiShoppingCart size={24} />,
      path: "/cart",
    },
  ];

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    closeSidebar();

    window.location.href = "/login";
  };

  // ==========================================
  // User
  // ==========================================

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = null;
  }

  return (
    <>
      {/* ====================================== */}
      {/* Overlay */}
      {/* ====================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
className="
  fixed
  inset-0
  z-[150]
  bg-black/50
  backdrop-blur-sm
  lg:hidden
"
          />
        )}
      </AnimatePresence>

      {/* ====================================== */}
      {/* Sidebar */}
      {/* ====================================== */}

      <motion.aside
        initial={{ x: -350 }}
        animate={{ x: 0 }}
        exit={{ x: -350 }}
        transition={{
          duration: 0.35,
        }}
className="
  fixed
  left-0
  top-0
  bottom-0

  z-[200]

  h-screen

  w-[330px]
  max-w-[90vw]

  overflow-y-auto

  bg-[#F8FAF8]

  shadow-2xl

  lg:hidden
"
      >
        {/* ==================================== */}
        {/* Mobile Profile */}
        {/* ==================================== */}

        <MobileProfile
          closeSidebar={closeSidebar}
          user={user}
        />

        {/* ==================================== */}
        {/* Quick Actions */}
        {/* ==================================== */}

        <div className="grid grid-cols-4 gap-3 p-5">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={closeSidebar}
              className="
                group

                flex
                flex-col
                items-center
                gap-2

                rounded-2xl

                bg-white

                p-3

                shadow-md

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div
                className="
                  rounded-full

                  p-3

                  text-[var(--primary-color)]

                  transition-all
                  duration-300

                  group-hover:text-white
                "
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary-color) 12%, white)",
                }}
              >
                {item.icon}
              </div>

              <span
                className="
                  text-xs
                  font-medium

                  transition-colors

                  group-hover:text-[var(--primary-color)]
                "
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* ==================================== */}
        {/* Shop Heading */}
        {/* ==================================== */}

        <div className="px-5 pb-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Shop
            </h3>

            <div className="ml-4 h-px flex-1 bg-gray-200" />
          </div>
        </div>

        {/* ==================================== */}
        {/* Navigation */}
        {/* ==================================== */}

        <div className="space-y-2 px-4">
          {navigationData.map((item) => (
            <div
              key={item.id}
              className="
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-sm
              "
            >
              {/* ============================== */}
              {/* Normal Link */}
              {/* ============================== */}

              {!item.megaMenu && (
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className="
                    group

                    flex
                    items-center
                    justify-between

                    px-5
                    py-4

                    transition-all
                    duration-300
                  "
                  style={{
                    "--hover-bg":
                      "color-mix(in srgb, var(--primary-color) 8%, white)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "";
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center

                        rounded-xl

                        text-[var(--primary-color)]

                        transition-colors
                        duration-300
                      "
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--primary-color) 12%, white)",
                      }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h4
                        className="
                          font-semibold
                          text-gray-800

                          transition-colors

                          group-hover:text-[var(--primary-color)]
                        "
                      >
                        {item.title}
                      </h4>

                      <p className="text-xs text-gray-500">
                        Explore {item.title}
                      </p>
                    </div>
                  </div>

                  <FiChevronRight className="text-gray-400 transition-colors group-hover:text-[var(--primary-color)]" />
                </Link>
              )}

              {/* ============================== */}
              {/* Expandable Menu */}
              {/* ============================== */}

              {item.megaMenu && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === item.id
                          ? null
                          : item.id
                      )
                    }
                    className="
                      group

                      flex
                      w-full
                      items-center
                      justify-between

                      px-5
                      py-4

                      transition-all
                      duration-300
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center

                          rounded-xl

                          text-[var(--primary-color)]

                          transition-colors
                          duration-300
                        "
                        style={{
                          backgroundColor:
                            "color-mix(in srgb, var(--primary-color) 12%, white)",
                        }}
                      >
                        {item.icon}
                      </div>

                      <div>
                        <h4
                          className="
                            font-semibold
                            text-gray-800

                            transition-colors

                            group-hover:text-[var(--primary-color)]
                          "
                        >
                          {item.title}
                        </h4>

                        <p className="text-xs text-gray-500">
                          Browse Categories
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        rotate:
                          activeMenu === item.id
                            ? 180
                            : 0,
                      }}
                      className={
                        activeMenu === item.id
                          ? "text-[var(--primary-color)]"
                          : "text-gray-500"
                      }
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  {/* ========================== */}
                  {/* Sub Menu */}
                  {/* ========================== */}

                  <AnimatePresence>
                    {activeMenu === item.id && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="overflow-hidden"
                        style={{
                          backgroundColor:
                            "color-mix(in srgb, var(--primary-color) 7%, white)",
                        }}
                      >
                        <div className="space-y-5 p-5">
                          {item.sections?.map(
                            (section) => (
                              <div
                                key={
                                  section.title
                                }
                              >
<h4
  className="
    mb-3

    cursor-default

    text-sm
    font-bold
    uppercase
    tracking-wide

    text-gray-700

    transition-colors
    duration-300

    hover:text-[var(--primary-color)]
  "
>
  {section.title}
</h4>

                                <div className="space-y-2">
                                  {section.items?.map(
                                    (
                                      subItem,
                                      index
                                    ) => (
                                    <Link
  key={subItem.slug}
  to={`/category/${subItem.categorySlug}/${subItem.menuGroupSlug}/${subItem.slug}`}
  onClick={closeSidebar}
  className="
    flex
    items-center
    justify-between

    rounded-xl

    bg-white

    px-4
    py-3

    text-sm
    text-gray-700

    shadow-sm

    transition-all
    duration-300

    hover:bg-[var(--primary-color)]
    hover:text-white
  "
>
  {subItem.name}

  <FiChevronRight />
</Link>
                                    )
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ==================================== */}
        {/* Logout */}
        {/* ==================================== */}

        <div className="px-5 py-8">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3

              rounded-2xl

              bg-red-500

              px-5
              py-4

              font-semibold
              text-white

              shadow-lg

              transition-all
              duration-300

              hover:bg-red-600
              hover:shadow-xl
            "
          >
            <FiLogOut size={20} />

            Logout
          </button>
        </div>

        {/* ==================================== */}
        {/* Footer */}
        {/* ==================================== */}

        <div className="pb-10 text-center">
          <p className="text-xs text-gray-400">
            Naturio v1.0
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Made with ❤ for Healthy Living
          </p>
        </div>
      </motion.aside>
    </>
  );
};

export default MobileSidebar;