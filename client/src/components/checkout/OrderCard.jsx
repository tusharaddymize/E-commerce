import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const OrderCard = ({ order }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#FEF3C7",
          color: "#B45309",
        };

      case "Processing":
        return {
          backgroundColor: "#DBEAFE",
          color: "#1D4ED8",
        };

      case "Shipped":
        return {
          backgroundColor: "#E0E7FF",
          color: "#4338CA",
        };

      case "Delivered":
        return {
          backgroundColor: "#DCFCE7",
          color: "#15803D",
        };

      case "Cancelled":
        return {
          backgroundColor: "#FEE2E2",
          color: "#DC2626",
        };

      default:
        return {
          backgroundColor: "#F3F4F6",
          color: "#374151",
        };
    }
  };

  const product = order.items?.[0];

  return (
    <div
      className="
        bg-white
        border
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        p-4
        sm:p-5
        lg:p-6
      "
      style={{
        borderRadius: "var(--border-radius)",
      }}
    >
      <div className="flex flex-col md:flex-row gap-5">
        {/* Product Image */}

        <div className="flex justify-center md:block">
          <img
            src={product?.image || "/placeholder.png"}
            alt={product?.title || "Product"}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
            className="
              w-28
              h-28
              sm:w-32
              sm:h-32
              lg:w-36
              lg:h-36
              object-contain
              bg-white
              border
              p-2
            "
            style={{
              borderRadius: "var(--border-radius)",
            }}
          />
        </div>

        {/* Details */}

        <div className="flex-1 flex flex-col justify-between">
          {/* Top */}

          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="min-w-0">
              <h2
                className="
                  text-lg
                  sm:text-xl
                  lg:text-2xl
                  font-bold
                  text-gray-800
                  line-clamp-2
                "
              >
                {product?.title || "Product"}
              </h2>

              <p className="mt-3 text-sm text-gray-500 break-all">
                <span className="font-medium">
                  Order ID :
                </span>{" "}
                {order._id}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium">
                  Ordered On :
                </span>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="flex lg:justify-end">
              <span
                className="
                  px-4
                  py-2
                  text-sm
                  font-semibold
                "
                style={{
                  ...getStatusStyle(
                    order.orderStatus
                  ),
                  borderRadius:
                    "9999px",
                }}
              >
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Bottom */}

          <div
            className="
              mt-6
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >
            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>
+
              <h3
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                "
                style={{
                  color:
                    "var(--primary-color)",
                }}
              >
                ₹
                {Number(
                  order.total || 0
                ).toLocaleString("en-IN")}
              </h3>
            </div>

            <Link
              to={`/order/${order._id}`}

                className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                text-white
                font-semibold
                transition-all
                duration-300
                hover:opacity-90
                active:scale-95
              "
              style={{
                backgroundColor:
                  "var(--button-color)",
                borderRadius:
                  "var(--border-radius)",
              }}
            >
              <FaBoxOpen size={18} />

              <span>View Details</span>

              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;