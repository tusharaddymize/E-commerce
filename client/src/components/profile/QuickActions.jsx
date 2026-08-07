import { useNavigate } from "react-router-dom";

import {
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMapPin,
  FiLock,
  FiSettings,
  FiArrowRight,
} from "react-icons/fi";

const QuickActions = () => {
  const navigate = useNavigate();

  // ==========================================
  // Scroll To Profile Section
  // ==========================================

  const scrollToSection = (id) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==========================================
  // Quick Actions
  // ==========================================

  const actions = [
    {
      title: "My Orders",
      description:
        "View and track your orders",
      icon: FiShoppingBag,
      action: () => navigate("/orders"),
    },
    {
      title: "Wishlist",
      description:
        "View your saved products",
      icon: FiHeart,
      action: () =>
        navigate("/wishlist"),
    },
    {
      title: "Edit Profile",
      description:
        "Update your personal details",
      icon: FiUser,
      action: () =>
        navigate("/edit-profile"),
    },
    {
      title: "Addresses",
      description:
        "Manage delivery addresses",
      icon: FiMapPin,
      action: () =>
        scrollToSection("addresses"),
    },
    {
      title: "Change Password",
      description:
        "Update your account password",
      icon: FiLock,
      action: () =>
        scrollToSection(
          "change-password"
        ),
    },
    // {
    //   title: "Account Settings",
    //   description:
    //     "Manage account preferences",
    //   icon: FiSettings,
    //   action: () =>
    //     scrollToSection(
    //       "account-settings"
    //     ),
    // },
  ];

  return (
    <div
      className="
        bg-white

        border
        border-gray-200

        shadow-sm

        rounded-2xl

        overflow-hidden
      "
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div
        className="
          px-5
          sm:px-6
          py-4

          border-b
          border-gray-100
        "
      >
        <h2
          className="
            text-lg
            sm:text-xl

            font-bold
            text-gray-900
          "
        >
          Quick Actions
        </h2>

        <p
          className="
            mt-1
            text-xs
            sm:text-sm
            text-gray-500
          "
        >
          Quickly access your account
          options
        </p>
      </div>

      {/* ====================================== */}
      {/* Actions Grid */}
      {/* ====================================== */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-3

          gap-3
          sm:gap-4

          p-4
          sm:p-6
        "
      >
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              onClick={item.action}
              className="
                group

                min-w-0

                flex
                flex-col

                text-left

                p-4

                border
                border-gray-200

                rounded-xl

                bg-white

                transition-all
                duration-200

                hover:border-[var(--primary-color,#355E3B)]
                hover:shadow-md
                hover:-translate-y-0.5
              "
            >
              {/* Icon */}

              <div
                className="
                  w-10
                  h-10

                  flex
                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--primary-color,#355E3B)]/10
                  text-[var(--primary-color,#355E3B)]

                  transition-colors

                  group-hover:bg-[var(--primary-color,#355E3B)]
                  group-hover:text-white
                "
              >
                <Icon size={18} />
              </div>

              {/* Title */}

              <h3
                className="
                  mt-3

                  text-sm
                  sm:text-base

                  font-semibold
                  text-gray-900
                "
              >
                {item.title}
              </h3>

              {/* Description */}

              <p
                className="
                  hidden
                  sm:block

                  mt-1

                  text-xs
                  text-gray-500

                  line-clamp-2
                "
              >
                {item.description}
              </p>

              {/* Arrow */}

              <div
                className="
                  mt-3

                  flex
                  items-center
                  gap-1

                  text-xs
                  font-semibold

                  text-[var(--primary-color,#355E3B)]
                "
              >
                Open

                <FiArrowRight
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;