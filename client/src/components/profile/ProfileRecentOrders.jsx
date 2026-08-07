import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { getOrders } from "../../services/orderService";
import {
  FiShoppingBag,
  FiArrowRight,
  FiPackage,
} from "react-icons/fi";


const ProfileRecentOrders = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // Fetch Recent Orders
  // ==========================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

const data = await getOrders();

        // Supports different response structures
        const orderList =
          data?.orders ||
          data?.data ||
          (Array.isArray(data)
            ? data
            : []);

        // Latest 3 orders
        const recentOrders = [
          ...orderList,
        ]
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 3);

        setOrders(recentOrders);
      } catch (error) {
        console.error(
          "Recent Orders Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load recent orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ==========================================
  // Status Style
  // ==========================================

  const getStatusStyle = (status) => {
    const normalizedStatus =
      status?.toLowerCase();

    switch (normalizedStatus) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "pending":
        return "bg-orange-100 text-orange-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ==========================================
  // Order Total
  // ==========================================

  const getOrderTotal = (order) => {
    return (
      order?.totalPrice ??
      order?.totalAmount ??
      order?.total ??
      0
    );
  };

  // ==========================================
  // Order ID
  // ==========================================

  const getShortOrderId = (order) => {
    const id =
      order?._id ||
      order?.id ||
      "";

    if (!id) return "N/A";

    return `#${String(id)
      .slice(-8)
      .toUpperCase()}`;
  };

  // ==========================================
  // Order Date
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <section
        className="
          bg-white
          border
          border-gray-200
          shadow-sm
          rounded-2xl
          p-5
          sm:p-6
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">
            Recent Orders
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-20
                  rounded-xl
                  bg-gray-100
                  animate-pulse
                "
              />
            )
          )}
        </div>
      </section>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <section
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
      {/* Header */}
      {/* ====================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          gap-3

          px-5
          sm:px-6

          py-4

          border-b
          border-gray-100
        "
      >
        <div className="flex items-center gap-3">
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
            "
          >
            <FiShoppingBag />
          </div>

          <div>
            <h2
              className="
                text-lg
                sm:text-xl

                font-bold
                text-gray-900
              "
            >
              Recent Orders
            </h2>

            <p
              className="
                hidden
                sm:block

                text-xs
                text-gray-500
              "
            >
              Your latest purchases
            </p>
          </div>
        </div>

        <Link
          to="/orders"
          className="
            flex
            items-center
            gap-1

            text-xs
            sm:text-sm

            font-semibold

            text-[var(--primary-color,#355E3B)]

            hover:underline
          "
        >
          View All

          <FiArrowRight />
        </Link>
      </div>

      {/* ====================================== */}
      {/* Error */}
      {/* ====================================== */}

      {error && (
        <div
          className="
            mx-5
            sm:mx-6

            my-5

            p-4

            rounded-xl

            bg-red-50
            text-red-600

            text-sm
          "
        >
          {error}
        </div>
      )}

      {/* ====================================== */}
      {/* Empty Orders */}
      {/* ====================================== */}

      {!error &&
        orders.length === 0 && (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center

              text-center

              px-5
              py-10
            "
          >
            <div
              className="
                w-14
                h-14

                flex
                items-center
                justify-center

                rounded-full

                bg-gray-100
                text-gray-400
              "
            >
              <FiPackage size={24} />
            </div>

            <h3
              className="
                mt-4

                font-semibold
                text-gray-900
              "
            >
              No orders yet
            </h3>

            <p
              className="
                mt-1

                text-sm
                text-gray-500
              "
            >
              Your recent orders will
              appear here.
            </p>

            <Link
              to="/"
              className="
                mt-4

                px-5
                py-2.5

                rounded-xl

                text-sm
                font-semibold

                text-white

                bg-[var(--primary-color,#355E3B)]

                hover:opacity-90
              "
            >
              Start Shopping
            </Link>
          </div>
        )}

      {/* ====================================== */}
      {/* Orders */}
      {/* ====================================== */}

      {!error &&
        orders.length > 0 && (
          <div>
            {orders.map(
              (order, index) => {
                const orderId =
                  order?._id ||
                  order?.id;

                return (
                  <Link
                    key={
                      orderId ||
                      index
                    }
                    to={`/order/${orderId}`}
                    className="
                      group

                      flex
                      items-center
                      justify-between

                      gap-3

                      px-5
                      sm:px-6

                      py-4

                      border-b
                      border-gray-100

                      last:border-b-0

                      transition-colors

                      hover:bg-gray-50
                    "
                  >
                    {/* ========================= */}
                    {/* Left */}
                    {/* ========================= */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3

                        min-w-0
                      "
                    >
                      <div
                        className="
                          w-11
                          h-11

                          sm:w-12
                          sm:h-12

                          shrink-0

                          flex
                          items-center
                          justify-center

                          rounded-xl

                          bg-gray-100

                          text-[var(--primary-color,#355E3B)]
                        "
                      >
                        <FiPackage
                          size={20}
                        />
                      </div>

                      <div className="min-w-0">
                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-gray-900
                          "
                        >
                          Order{" "}
                          {getShortOrderId(
                            order
                          )}
                        </h3>

                        <p
                          className="
                            mt-1

                            text-xs
                            text-gray-500
                          "
                        >
                          {formatDate(
                            order.createdAt
                          )}
                        </p>
                      </div>
                    </div>

                    {/* ========================= */}
                    {/* Right */}
                    {/* ========================= */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3

                        shrink-0
                      "
                    >
                      <div className="text-right">
                        <p
                          className="
                            text-sm
                            font-bold
                            text-gray-900
                          "
                        >
                          ₹
                          {Number(
                            getOrderTotal(
                              order
                            )
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <span
                          className={`
                            inline-block

                            mt-1

                            px-2
                            py-1

                            rounded-full

                            text-[10px]
                            sm:text-xs

                            font-semibold

                            ${getStatusStyle(
                              order.status ||
                                order.orderStatus
                            )}
                          `}
                        >
                          {order.status ||
                            order.orderStatus ||
                            "Pending"}
                        </span>
                      </div>

                      <FiArrowRight
                        className="
                          hidden
                          sm:block

                          text-gray-400

                          transition-transform

                          group-hover:translate-x-1
                          group-hover:text-[var(--primary-color,#355E3B)]
                        "
                      />
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        )}
    </section>
  );
};

export default ProfileRecentOrders;