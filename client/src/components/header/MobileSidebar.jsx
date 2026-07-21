import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiChevronDown,
  FiChevronRight,
  FiX,
  FiHome,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiShoppingBag,
} from "react-icons/fi";

import { navLinks } from "./headerData";

const MobileSidebar = ({ open, closeSidebar }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={closeSidebar}
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      />

      {/* Sidebar */}

      <aside
        className="
        fixed
        top-0
        left-0
        w-[320px]
        max-w-[85vw]
        h-screen
        bg-white
        z-50
        overflow-y-auto
        shadow-2xl
        lg:hidden
        "
      >
        {/* Header */}

        <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-[#355E3B]">
            Naturio
          </h2>

          <button onClick={closeSidebar}>
            <FiX size={28} />
          </button>

        </div>

        {/* Quick Links */}

        <div className="grid grid-cols-4 gap-4 p-5 border-b">

          <Link
            to="/"
            onClick={closeSidebar}
            className="flex flex-col items-center gap-2"
          >
            <FiHome size={22} />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/profile"
            onClick={closeSidebar}
            className="flex flex-col items-center gap-2"
          >
            <FiUser size={22} />
            <span className="text-xs">Profile</span>
          </Link>

          <Link
            to="/wishlist"
            onClick={closeSidebar}
            className="flex flex-col items-center gap-2"
          >
            <FiHeart size={22} />
            <span className="text-xs">Wishlist</span>
          </Link>

          <Link
            to="/cart"
            onClick={closeSidebar}
            className="flex flex-col items-center gap-2"
          >
            <FiShoppingCart size={22} />
            <span className="text-xs">Cart</span>
          </Link>

        </div>

        {/* Categories */}

        <div className="py-2">

          {navLinks.map((item) => (

            <div
              key={item.id}
              className="border-b"
            >

              {/* Normal Link */}

              {!item.megaMenu && (

                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
                >

                  <span className="text-xl">

                    {item.icon}

                  </span>

                  <span className="font-medium">

                    {item.title}

                  </span>

                </Link>

              )}

              {/* Expandable */}

              {item.megaMenu && (

                <>
                  <button
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === item.id
                          ? null
                          : item.id
                      )
                    }
                    className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-100"
                  >

                    <div className="flex items-center gap-3">

                      <span className="text-xl">

                        {item.icon}

                      </span>

                      <span className="font-medium">

                        {item.title}

                      </span>

                    </div>

                    {activeMenu === item.id ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}

                  </button>

                  {activeMenu === item.id && (

                    <div className="bg-gray-50">

                      {item.sections.map(
                        (section) => (

                          <div
                            key={section.title}
                            className="px-6 py-3"
                          >

                            <h3 className="font-semibold text-[#355E3B] mb-2">

                              {section.title}

                            </h3>

                            <div className="space-y-2">

                              {section.items.map(
                                (subItem) => (

                                  <Link
                                    key={subItem}
                                    to={`/search/${subItem.toLowerCase()}`}
                                    onClick={closeSidebar}
                                    className="block text-sm text-gray-600 hover:text-[#355E3B]"
                                  >
                                    {subItem}
                                  </Link>

                                )
                              )}

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </>

              )}

            </div>

          ))}

        </div>

        {/* Bottom */}

        <div className="border-t p-5">

          <Link
            to="/orders"
            onClick={closeSidebar}
            className="flex items-center gap-3 text-gray-700 hover:text-[#355E3B]"
          >
            <FiShoppingBag size={20} />

            My Orders

          </Link>

        </div>

      </aside>
    </>
  );
};

export default MobileSidebar;