import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { useCategory } from "../../context/CategoryContext";
import MegaMenu from "./MegaMenu";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const {
    categories = [],
    menuGroups = [],
    subCategories = [],
    loading,
  } = useCategory();

  // ==========================================
  // Helper - Get Relation ID
  // ==========================================

  const getRelationId = (value) => {
    if (!value) return "";

    // Populated MongoDB object
    if (typeof value === "object") {
      return String(value._id || "");
    }

    // Direct ObjectId/String
    return String(value);
  };

  // ==========================================
  // Build Dynamic Navigation
  // ==========================================

  const navigationData = useMemo(() => {
    return categories
      .filter(
        (category) =>
          category.isActive !== false
      )
      .sort(
        (a, b) =>
          (a.sortOrder || 0) -
          (b.sortOrder || 0)
      )
      .map((category) => {
        // ======================================
        // Menu Groups Of Current Category
        // ======================================

        const sections = menuGroups
          .filter((group) => {
            const groupCategoryId =
              getRelationId(group.category);

            return (
              groupCategoryId ===
                String(category._id) &&
              group.isActive !== false
            );
          })
          .sort(
            (a, b) =>
              (a.sortOrder || 0) -
              (b.sortOrder || 0)
          )
          .map((group) => {
            // ==================================
            // Sub Categories Of Current Group
            // ==================================

            const items = subCategories
              .filter((sub) => {
                const subGroupId =
                  getRelationId(
                    sub.menuGroup
                  );

                const subCategoryId =
                  getRelationId(
                    sub.category
                  );

                return (
                  subGroupId ===
                    String(group._id) &&
                  subCategoryId ===
                    String(category._id) &&
                  sub.isActive !== false
                );
              })
              .sort(
                (a, b) =>
                  (a.sortOrder || 0) -
                  (b.sortOrder || 0)
              )
              .map((sub) => ({
                id: sub._id,

                name: sub.name,

                slug: sub.slug,

                categorySlug:
                  category.slug,

                menuGroupSlug:
                  group.slug,

                path:
                  `/category/${category.slug}/${group.slug}/${sub.slug}`,
              }));

            // IMPORTANT:
            // Menu group ko items empty hone par
            // remove nahi karna hai.

            return {
              id: group._id,

              title: group.name,

              slug: group.slug,

              categorySlug:
                category.slug,

              path:
                `/category/${category.slug}/${group.slug}`,

              items,
            };
          });

        return {
          id: category._id,

          title: category.name,

          slug: category.slug,

          path:
            `/category/${category.slug}`,

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

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          hidden
          lg:block
          h-14
          border-t
          border-gray-200
          bg-white
        "
      />
    );
  }

  // ==========================================
  // Render
  // ==========================================

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
      onMouseLeave={() =>
        setActiveMenu(null)
      }
    >
      {/* ======================================
          Navigation Container
      ====================================== */}

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
              className="
                relative
                h-full
                flex
                items-center
                group
              "
              onMouseEnter={() => {
                if (link.megaMenu) {
                  setActiveMenu(link);
                } else {
                  setActiveMenu(null);
                }
              }}
            >
              {/* ==================================
                  Category Link
              ================================== */}

              <a
                href={link.path}
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

                {/* Arrow */}

                {link.megaMenu && (
                  <FiChevronDown
                    className={`
                      transition-transform
                      duration-300

                      ${
                        activeMenu?.id ===
                        link.id
                          ? "rotate-180 text-[var(--primary-color)]"
                          : ""
                      }
                    `}
                  />
                )}

                {/* Bottom Hover Line */}

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
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ======================================
          Mega Menu
      ====================================== */}

      {activeMenu?.megaMenu && (
        <MegaMenu
          activeMenu={activeMenu}
        />
      )}
    </nav>
  );
};

export default Navigation;