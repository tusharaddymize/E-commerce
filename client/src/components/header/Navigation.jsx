import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

import { useCategory } from "../../context/CategoryContext";
import MegaMenu from "./MegaMenu";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const {
    categories,
    menuGroups,
    subCategories,
    loading,
  } = useCategory();

  /* ==========================================
      Build Dynamic Navigation
  ========================================== */

  const navigationData = useMemo(() => {
   return categories
  .filter((category) => category.isActive !== false)
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
.filter((section) => section.items.length > 0);

      return {
        id: category._id,

        title: category.name,

        path: `/category/${category.slug}`,

        megaMenu:
          sections.length > 0,

        sections,
      };
    });
  }, [
    categories,
    menuGroups,
    subCategories,
  ]);

  /* ==========================================
      Loading
  ========================================== */

  if (loading) {
    return (
      <nav
        className="
          hidden
          lg:flex
          h-14
          items-center
          justify-center
          border-t
          border-gray-200
          bg-white
        "
      >
        <div className="h-14" />
      </nav>
    );
  }
    return (
    <nav
      className="
        hidden
        lg:block
        border-t
        border-gray-200
        bg-white
        relative
        z-40
      "
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* ====================================== */}
      {/* Navigation Container */}
      {/* ====================================== */}

      <div
        className="
          w-full
          max-w-[var(--container-width,1450px)]
          mx-auto
          px-6
        "
      >
        <ul
          className="
            flex
            items-center
            justify-center
            gap-10
            h-14
          "
        >
          {navigationData.map((link) => (
            <li
              key={link.id}
              className="relative h-full flex items-center"
              onMouseEnter={() => {
                if (link.megaMenu) {
                  setActiveMenu(link);
                } else {
                  setActiveMenu(null);
                }
              }}
            >
<button
  type="button"
  className="
    relative
    flex
    items-center
    gap-2
    h-full
    text-[15px]
    font-medium
    text-gray-700
    transition-colors
    duration-300
    hover:text-[var(--primary-color)]
  "
>
                {link.title}

                {link.megaMenu && (
                  <FiChevronDown
                    className={`
                      transition-transform
                      duration-300
                      ${
                        activeMenu?.id === link.id
                          ? "rotate-180 text-[var(--primary-color)]"
                          : ""
                      }
                    `}
                  />
                )}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-0
                    h-[2px]
                    bg-[var(--primary-color)]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ====================================== */}
      {/* Mega Menu */}
      {/* ====================================== */}

      {activeMenu?.megaMenu && (
        <MegaMenu activeMenu={activeMenu} />
      )}
    </nav>
  );
};

export default Navigation;