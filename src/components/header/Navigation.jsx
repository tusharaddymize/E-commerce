import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

import { navLinks } from "./headerData";
import MegaMenu from "./MegaMenu";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <nav
      className="relative border-t border-gray-200 bg-white"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-[1450px] mx-auto px-6">
        <ul className="flex items-center justify-center gap-10 h-14">
          {navLinks.map((link) => (
            <li
              key={link.id}
              onMouseEnter={() => {
                if (link.megaMenu) {
                  setActiveMenu(link);
                } else {
                  setActiveMenu(null);
                }
              }}
            >
              <NavLink
                to={link.path || "#"}
                className={({ isActive }) =>
                  `flex items-center gap-1 text-[15px] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#355E3B]"
                      : "text-gray-700 hover:text-[#355E3B]"
                  }`
                }
              >
                {link.title}

                {link.megaMenu && (
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      activeMenu?.id === link.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Full Width Mega Menu */}
      {activeMenu && <MegaMenu activeMenu={activeMenu} />}
    </nav>
  );
};

export default Navigation;