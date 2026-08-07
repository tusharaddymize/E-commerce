import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const MegaMenu = ({ activeMenu }) => {
  if (
    !activeMenu ||
    !activeMenu.sections
  ) {
    return null;
  }

  // Empty sections remove
  const sections =
    activeMenu.sections.filter(
      (section) =>
        section.items &&
        section.items.length > 0
    );

  if (sections.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 8,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          absolute
          left-0
          top-full
          z-50

          w-full

          border-t
          border-gray-200

          bg-white

          shadow-lg
        "
      >
        {/* ====================================== */}
        {/* Mega Menu Container */}
        {/* ====================================== */}

        <div
          className="
            w-full
            max-w-[var(--container-width,1450px)]
            mx-auto

            px-6
            py-5
          "
        >
          {/* ====================================== */}
          {/* Categories - Single Row */}
          {/* ====================================== */}

          <div
            className="
              flex
              flex-row
              flex-nowrap
              items-start
              justify-start

              gap-x-8

              w-full
            "
          >
            {sections.map((section) => (
              <div
                key={section.title}
                className="
                  flex-1
                  min-w-0
                "
              >
                {/* Section Heading */}

                <h3
                  className="
                    mb-3

                    text-[15px]
                    font-bold

                    leading-5

                    text-[var(--primary-color)]
                  "
                >
                  {section.title}
                </h3>

                {/* Section Items */}

                <ul className="space-y-2">
                  {section.items.map(
                    (item) => (
                      <li key={item.slug}>
                        <Link
                          to={`/category/${item.categorySlug}/${item.menuGroupSlug}/${item.slug}`}
                          className="
                            block

                            text-[14px]
                            leading-5

                            text-gray-600

                            transition-colors
                            duration-200

                            hover:text-[var(--primary-color)]
                          "
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MegaMenu;