import { Link } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

const ProfileInfo = ({ user }) => {
  // ==========================================
  // Member Since
  // ==========================================

  const memberSince = user?.createdAt
    ? new Date(
        user.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Recently Joined";

  // ==========================================
  // Information
  // ==========================================

  const information = [
    {
      label: "Name",
      value: user?.name || "Not Added",
      icon: FiUser,
    },
    {
      label: "Email",
      value: user?.email || "Not Added",
      icon: FiMail,
    },
    {
      label: "Phone",
      value: user?.phone || "Not Added",
      icon: FiPhone,
    },
    {
      label: "Member Since",
      value: memberSince,
      icon: FiCalendar,
    },
  ];

  return (
    <div
      id="profile-details"
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
          flex
          items-center
          justify-between

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
          Account Information
        </h2>

        <Link
          to="/edit-profile"
          className="
            text-sm
            font-semibold

            text-[var(--primary-color,#355E3B)]

            hover:underline
          "
        >
          Edit
        </Link>
      </div>

      {/* ====================================== */}
      {/* Information */}
      {/* ====================================== */}

      <div className="px-5 sm:px-6">
        {information.map(
          (item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`
                  grid
                  grid-cols-[32px_100px_1fr]
                  sm:grid-cols-[36px_130px_1fr]

                  items-center

                  gap-2
                  sm:gap-3

                  py-4

                  ${
                    index !==
                    information.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }
                `}
              >
                {/* Icon */}

                <div
                  className="
                    text-gray-500

                    flex
                    items-center
                  "
                >
                  <Icon size={17} />
                </div>

                {/* Label */}

                <p
                  className="
                    text-xs
                    sm:text-sm

                    text-gray-500
                  "
                >
                  {item.label}
                </p>

                {/* Value */}

                <p
                  className="
                    text-xs
                    sm:text-sm

                    font-medium
                    text-gray-900

                    text-right

                    truncate
                  "
                  title={item.value}
                >
                  {item.value}
                </p>
              </div>
            );
          }
        )}
      </div>

      {/* ====================================== */}
      {/* View / Edit Profile */}
      {/* ====================================== */}

      <div className="p-5 sm:p-6 pt-2 sm:pt-3">
        <Link
          to="/edit-profile"
          className="
            w-full

            flex
            items-center
            justify-center
            gap-2

            py-3

            rounded-xl

            text-sm
            font-semibold

            text-white
            bg-[var(--primary-color,#355E3B)]

            transition-all
            duration-200

            hover:opacity-90
          "
        >
          View Profile Details

          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;