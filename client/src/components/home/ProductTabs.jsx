import { motion } from "framer-motion";

import {
  FaFire,
  FaStar,
  FaCrown,
} from "react-icons/fa";

import { MdNewReleases } from "react-icons/md";

// ==========================================
// Tabs
// ==========================================

const tabs = [
  {
    id: "trending",
    label: "Trending",
    icon: FaFire,
  },
  {
    id: "featured",
    label: "Featured",
    icon: FaStar,
  },
  {
    id: "new",
    label: "New Arrival",
    icon: MdNewReleases,
  },
  {
    id: "best",
    label: "Best Selling",
    icon: FaCrown,
  },
];

const ProductTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className="
        w-full
        min-w-0

        flex
        items-center

        gap-2
        sm:gap-2.5
        lg:gap-3

        overflow-x-auto
        overflow-y-hidden

        scroll-smooth
        touch-pan-x

        py-1
        sm:py-2

        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden

        xl:justify-end
      "
    >
      {tabs.map((tab) => {
        const active =
          activeTab === tab.id;

        const Icon = tab.icon;

        return (
          <motion.button
            key={tab.id}
            type="button"

            whileTap={{
              scale: 0.96,
            }}

            whileHover={{
              scale: 1.02,
            }}

            onClick={() =>
              setActiveTab(tab.id)
            }

            className={`
              group

              shrink-0

              h-9
              min-[400px]:h-10
              sm:h-11
              md:h-12

              px-3
              min-[400px]:px-3.5
              sm:px-4
              md:px-5

              flex
              items-center
              justify-center

              gap-1.5
              sm:gap-2

              whitespace-nowrap

              border

              rounded-full

              text-[11px]
              min-[400px]:text-xs
              sm:text-sm
              md:text-[15px]

              font-semibold

              transition-all
              duration-300

              ${
                active
                  ? `
                    text-white
                    border-transparent
                    shadow-sm
                  `
                  : `
                    bg-white
                    text-gray-700
                    border-gray-200

                    hover:border-[var(--primary-color,#355E3B)]
                    hover:text-[var(--primary-color,#355E3B)]
                  `
              }
            `}

            style={
              active
                ? {
                    backgroundColor:
                      "var(--primary-color,#355E3B)",

                    borderColor:
                      "var(--primary-color,#355E3B)",
                  }
                : undefined
            }
          >
            {/* ================================= */}
            {/* Icon */}
            {/* ================================= */}

            <Icon
              className={`
                shrink-0

                text-xs
                min-[400px]:text-sm
                sm:text-base
                md:text-lg

                transition-all
                duration-300

                ${
                  active
                    ? "text-white"
                    : `
                      text-gray-500

                      group-hover:text-[var(--primary-color,#355E3B)]
                    `
                }
              `}
            />

            {/* ================================= */}
            {/* Label */}
            {/* ================================= */}

            <span>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ProductTabs;