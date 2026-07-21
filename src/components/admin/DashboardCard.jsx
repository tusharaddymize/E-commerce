import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-green-100 text-green-700",
  growth = "",
  loading = false,
}) => {
  // ===============================
  // Loading Skeleton
  // ===============================

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-gray-200" />

          <div className="w-14 h-5 rounded bg-gray-200" />
        </div>

        <div className="mt-6">
          <div className="w-28 h-4 rounded bg-gray-200 mb-4" />

          <div className="w-32 h-8 rounded bg-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        relative
        overflow-hidden
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between">
          {/* Icon */}

          <div
            className={`
              w-14
              h-14
              sm:w-16
              sm:h-16
              rounded-2xl
              flex
              items-center
              justify-center
              shadow-sm
              ${color}
            `}
          >
            {icon}
          </div>

          {/* Growth */}

          {growth && (
            <div className="flex items-center gap-1 text-green-600 font-semibold text-xs sm:text-sm">
              <ArrowUpRight size={16} />

              {growth}
            </div>
          )}
        </div>

        {/* Details */}

        <div className="mt-6">
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 break-all">
            {value}
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;