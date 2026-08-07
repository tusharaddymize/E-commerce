import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiSearch,
  FiFilter,
  FiShoppingBag,
} from "react-icons/fi";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import OrderCard from "../components/checkout/OrderCard";
import EmptyOrders from "../components/orders/EmptyOrders";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorState from "../components/common/ErrorState";

import {
  getOrders,
} from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const ordersPerPage = 6;

  // ==========================================
  // Fetch Orders
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getOrders();

      setOrders(
        response?.orders ||
          (Array.isArray(response)
            ? response
            : [])
      );
    } catch (error) {
      console.error(
        "Orders Error:",
        error
      );

      setError(
        "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Search + Filter
  // ==========================================

  const filteredOrders =
    orders.filter((order) => {
      const orderId = String(
        order?._id || ""
      ).toLowerCase();

      const matchSearch =
        orderId.includes(
          search
            .trim()
            .toLowerCase()
        );

      const matchStatus =
        statusFilter === "All"
          ? true
          : order?.orderStatus ===
            statusFilter;

      return (
        matchSearch &&
        matchStatus
      );
    });

  // ==========================================
  // Pagination
  // ==========================================

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder -
    ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
    );

  const totalPages = Math.ceil(
    filteredOrders.length /
      ordersPerPage
  );

  // ==========================================
  // Reset Page When Search / Filter Changes
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // ==========================================
  // Render
  // ==========================================

  return (
    <>
      <Header />

      <main
        className="
          min-h-screen

          bg-[#f7f8f7]

          py-5
          sm:py-7
          lg:py-10
        "
      >
        <div
          className="
            w-full
            max-w-[1450px]

            mx-auto

            px-3
            sm:px-5
            lg:px-8
          "
        >
          {/* ================================== */}
          {/* Back To Profile */}
          {/* ================================== */}

          <Link
            to="/profile"
            className="
              inline-flex
              items-center
              gap-2

              mb-5
              sm:mb-6

              px-3
              sm:px-4

              py-2

              bg-white

              border
              border-gray-200

              rounded-xl

              text-sm
              font-semibold
              text-gray-700

              shadow-sm

              transition-all
              duration-200

              hover:border-[var(--primary-color,#355E3B)]
              hover:text-[var(--primary-color,#355E3B)]
              hover:shadow
            "
          >
            <FiArrowLeft size={17} />

            Back to Profile
          </Link>

          {/* ================================== */}
          {/* Page Header */}
          {/* ================================== */}

          <div
            className="
              bg-white

              border
              border-gray-200

              rounded-2xl

              shadow-sm

              overflow-hidden

              mb-5
              sm:mb-6
            "
          >
            {/* Heading */}

            <div
              className="
                flex
                items-center
                gap-3

                p-4
                sm:p-6
                lg:p-7

                border-b
                border-gray-100
              "
            >
              <div
                className="
                  hidden
                  sm:flex

                  w-12
                  h-12

                  shrink-0

                  items-center
                  justify-center

                  rounded-xl

                  bg-[var(--primary-color,#355E3B)]/10
                  text-[var(--primary-color,#355E3B)]
                "
              >
                <FiShoppingBag
                  size={22}
                />
              </div>

              <div>
                <h1
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl

                    font-bold
                    text-gray-900
                  "
                >
                  My Orders
                </h1>

                <p
                  className="
                    mt-1

                    text-xs
                    sm:text-sm

                    text-gray-500
                  "
                >
                  View, track and manage
                  all your orders.
                </p>
              </div>
            </div>

            {/* ================================= */}
            {/* Search + Filter */}
            {/* ================================= */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-[minmax(0,1fr)_220px]

                gap-3
                sm:gap-4

                p-4
                sm:p-6
              "
            >
              {/* Search */}

              <div
                className="
                  flex
                  items-center

                  h-11
                  sm:h-12

                  border
                  border-gray-300

                  rounded-xl

                  bg-white

                  transition-all

                  focus-within:border-[var(--primary-color,#355E3B)]
                  focus-within:ring-2
                  focus-within:ring-[var(--primary-color,#355E3B)]/10
                "
              >
                <FiSearch
                  className="
                    ml-4
                    shrink-0
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  placeholder="Search by Order ID..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-full

                    px-3

                    bg-transparent

                    text-sm

                    outline-none
                  "
                />
              </div>

              {/* Status Filter */}

              <div
                className="
                  relative

                  flex
                  items-center
                "
              >
                <FiFilter
                  className="
                    absolute
                    left-4

                    pointer-events-none

                    text-gray-400
                  "
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="
                    w-full

                    h-11
                    sm:h-12

                    pl-11
                    pr-4

                    border
                    border-gray-300

                    rounded-xl

                    bg-white

                    text-sm

                    outline-none

                    cursor-pointer

                    focus:border-[var(--primary-color,#355E3B)]
                  "
                >
                  <option value="All">
                    All Orders
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* ================================== */}
          {/* Result Count */}
          {/* ================================== */}

          {!loading &&
            !error &&
            filteredOrders.length >
              0 && (
              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-4

                  px-1
                "
              >
                <p
                  className="
                    text-xs
                    sm:text-sm

                    text-gray-500
                  "
                >
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {
                      filteredOrders.length
                    }
                  </span>{" "}
                  order
                  {filteredOrders.length !==
                  1
                    ? "s"
                    : ""}
                </p>
              </div>
            )}

          {/* ================================== */}
          {/* Loading */}
          {/* ================================== */}

          {loading && (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3

                gap-4
                sm:gap-6
              "
            >
              {[...Array(6)].map(
                (_, index) => (
                  <SkeletonCard
                    key={index}
                  />
                )
              )}
            </div>
          )}

          {/* ================================== */}
          {/* Error */}
          {/* ================================== */}

          {!loading && error && (
            <div
              className="
                bg-white

                border
                border-gray-200

                rounded-2xl

                p-5
                sm:p-8
              "
            >
              <ErrorState
                title="Failed to Load Orders"
                message={error}
                onRetry={fetchOrders}
              />
            </div>
          )}

          {/* ================================== */}
          {/* Empty Orders */}
          {/* ================================== */}

          {!loading &&
            !error &&
            filteredOrders.length ===
              0 && (
              <div
                className="
                  bg-white

                  border
                  border-gray-200

                  rounded-2xl

                  shadow-sm

                  overflow-hidden

                  max-w-2xl
                  mx-auto
                "
              >
                <EmptyOrders />
              </div>
            )}

          {/* ================================== */}
          {/* Orders */}
          {/* ================================== */}

          {!loading &&
            !error &&
            filteredOrders.length >
              0 && (
              <>
                <div
                  className="
                    space-y-4
                    sm:space-y-5
                  "
                >
                  {currentOrders.map(
                    (order) => (
                      <OrderCard
                        key={order._id}
                        order={order}
                      />
                    )
                  )}
                </div>

                {/* ============================= */}
                {/* Pagination */}
                {/* ============================= */}

                {totalPages > 1 && (
                  <div
                    className="
                      flex
                      flex-wrap

                      items-center
                      justify-center

                      gap-2

                      mt-8
                      sm:mt-10
                    "
                  >
                    <button
                      type="button"
                      disabled={
                        currentPage === 1
                      }
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            prev - 1
                        )
                      }
                      className="
                        h-10

                        px-3
                        sm:px-5

                        border
                        border-gray-300

                        bg-white

                        rounded-lg

                        text-xs
                        sm:text-sm

                        font-medium

                        transition

                        hover:border-[var(--primary-color,#355E3B)]

                        disabled:opacity-40
                        disabled:cursor-not-allowed
                      "
                    >
                      Previous
                    </button>

                    {[
                      ...Array(
                        totalPages
                      ),
                    ].map(
                      (_, index) => {
                        const page =
                          index + 1;

                        return (
                          <button
                            type="button"
                            key={page}
                            onClick={() =>
                              setCurrentPage(
                                page
                              )
                            }
                            className={`
                              w-10
                              h-10

                              rounded-lg

                              text-sm
                              font-semibold

                              border

                              transition-all

                              ${
                                currentPage ===
                                page
                                  ? "bg-[var(--primary-color,#355E3B)] text-white border-[var(--primary-color,#355E3B)]"
                                  : "bg-white border-gray-300 text-gray-700 hover:border-[var(--primary-color,#355E3B)]"
                              }
                            `}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}

                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            prev + 1
                        )
                      }
                      className="
                        h-10

                        px-3
                        sm:px-5

                        border
                        border-gray-300

                        bg-white

                        rounded-lg

                        text-xs
                        sm:text-sm

                        font-medium

                        transition

                        hover:border-[var(--primary-color,#355E3B)]

                        disabled:opacity-40
                        disabled:cursor-not-allowed
                      "
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Orders;