import { FaLeaf } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const MobileProfile = ({
  closeSidebar,
  user,
}) => {
  const name = user?.name || "Guest";

  const initial =
    name.charAt(0).toUpperCase() || "G";

  return (
    <div
      className="
        p-6
        text-white
        transition-colors
        duration-300
      "
      style={{
        background:
          "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
      }}
    >
      {/* ====================================== */}
      {/* Brand Header */}
      {/* ====================================== */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* Logo Icon */}

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-white

              text-[var(--primary-color)]

              shadow-lg

              transition-colors
              duration-300
            "
          >
            <FaLeaf size={22} />
          </div>

          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold">
              Naturio
            </h2>

            <p className="text-xs text-white/80">
              Live Natural, Live Better
            </p>
          </div>
        </div>

        {/* Close Button */}

        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close menu"
          className="
            rounded-xl

            bg-white/20

            p-2

            text-white

            transition-all
            duration-300

            hover:bg-white
            hover:text-[var(--primary-color)]
          "
        >
          <FiX size={24} />
        </button>
      </div>

      {/* ====================================== */}
      {/* User Profile */}
      {/* ====================================== */}

      <div
        className="
          mt-6

          flex
          items-center
          gap-4

          rounded-2xl

          bg-white/10

          p-4

          backdrop-blur
        "
      >
        {/* Avatar */}

        <div
          className="
            flex
            h-14
            w-14
            flex-shrink-0
            items-center
            justify-center

            rounded-full

            bg-white

            text-xl
            font-bold

            text-[var(--primary-color)]

            shadow-sm

            transition-colors
            duration-300
          "
        >
          {initial}
        </div>

        {/* User Info */}

        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate">
            Hi, {name} 👋
          </h3>

          <p className="text-sm text-white/80">
            Welcome Back
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileProfile;