import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FiShoppingBag,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const ProfileStats = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    savedAddresses: 0,
    memberSince: "",
  });

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Fetch Profile Stats
  // ==========================================

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(
          data?.stats || {
            totalOrders: 0,
            totalSpent: 0,
            savedAddresses: 0,
            memberSince: "",
          }
        );
      } catch (error) {
        console.error(
          "Profile Stats Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ==========================================
  // Scroll To Profile Section
  // ==========================================

  const scrollToSection = (id) => {
    const section =
      document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==========================================
  // Cards
  // ==========================================

  const cards = [
    {
      icon: FiShoppingBag,

      title: "Total Orders",

      value: stats.totalOrders || 0,

      actionText: "View all orders",

      onClick: () =>
        navigate("/orders"),
    },

    {
      icon: FiDollarSign,

      title: "Total Spent",

      value: `₹${Number(
        stats.totalSpent || 0
      ).toLocaleString("en-IN")}`,

      actionText: "Order history",

      onClick: () =>
        navigate("/orders"),
    },

    {
      icon: FiMapPin,

      title: "Addresses",

      value:
        stats.savedAddresses || 0,

      actionText: "Manage addresses",

      onClick: () =>
        scrollToSection("addresses"),
    },

    {
      icon: FiCalendar,

      title: "Member Since",

      value: stats.memberSince
        ? new Date(
            stats.memberSince
          ).getFullYear()
        : "-",

      actionText: "Profile details",

      onClick: () =>
        navigate("/edit-profile"),
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        xl:grid-cols-4

        gap-3
        sm:gap-4
      "
    >
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            type="button"
            onClick={item.onClick}
            className="
              group

              bg-white

              border
              border-gray-200

              shadow-sm

              p-4
              sm:p-5

              text-left

              rounded-2xl

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-md
              hover:border-[var(--primary-color,#355E3B)]/30
            "
          >
            {/* ================================= */}
            {/* Top */}
            {/* ================================= */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-10
                  h-10
                  sm:w-12
                  sm:h-12

                  rounded-full

                  flex
                  items-center
                  justify-center

                  shrink-0

                  bg-[var(--primary-color,#355E3B)]/10
                  text-[var(--primary-color,#355E3B)]
                "
              >
                <Icon
                  className="
                    text-lg
                    sm:text-xl
                  "
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    sm:text-sm

                    text-gray-500

                    truncate
                  "
                >
                  {item.title}
                </p>

                <h3
                  className="
                    mt-0.5

                    text-lg
                    sm:text-2xl

                    font-bold
                    text-gray-900

                    truncate
                  "
                >
                  {loading
                    ? "..."
                    : item.value}
                </h3>
              </div>
            </div>

            {/* ================================= */}
            {/* Action */}
            {/* ================================= */}

            <div
              className="
                hidden
                sm:flex

                items-center
                gap-1

                mt-4

                text-xs
                font-semibold

                text-[var(--primary-color,#355E3B)]
              "
            >
              {item.actionText}

              <FiArrowRight
                className="
                  transition-transform
                  duration-200

                  group-hover:translate-x-1
                "
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileStats;