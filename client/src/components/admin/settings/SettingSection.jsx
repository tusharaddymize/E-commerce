import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const SettingSection = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-green-50"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl text-green-600">{icon}</div>

          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
        </div>

        {isOpen ? (
          <FiChevronDown
            size={22}
            className="text-gray-600 transition-transform"
          />
        ) : (
          <FiChevronRight
            size={22}
            className="text-gray-600 transition-transform"
          />
        )}
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingSection;