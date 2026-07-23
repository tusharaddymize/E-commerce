import { motion } from "framer-motion";
import {
  FaFire,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";

const tabs = [
  {
    id: "trending",
    label: "Trending",
    icon: <FaFire />,
  },
  {
    id: "featured",
    label: "Featured",
    icon: <FaStar />,
  },
  {
    id: "new",
    label: "New Arrival",
    icon: <MdNewReleases />,
  },
  {
    id: "best",
    label: "Best Selling",
    icon: <FaCrown />,
  },
];

const ProductTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
<div
  className="
    flex
    items-center
    gap-4
    overflow-x-auto
    scrollbar-hide
    py-3
    px-2
  "
>
      {tabs.map((tab) => {
        const active =
          activeTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            whileTap={{
              scale: 0.96,
            }}
whileHover={{
  scale: 1.03,
}}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              whitespace-nowrap
              flex
              items-center
              gap-2
px-6
py-3
              rounded-full
              font-medium
              transition-all
              hover:shadow-lg
              duration-300
              border

              ${
                active
                  ? `
                  bg-[#355E3B]
                  text-white
                  border-[#355E3B]
                  shadow-lg
                `
                  : `
                  bg-white
                  text-gray-700
                  border-gray-200
                  hover:bg-gray-50
                  hover:border-[#355E3B]
                  hover:text-[#355E3B]
                `
              }
            `}
          >
            <span className="text-base">
              {tab.icon}
            </span>

            <span className="text-sm md:text-base">
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ProductTabs;