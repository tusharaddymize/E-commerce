import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useOrder } from "../../context/OrderContext";

const OrderSuccess = () => {
  const { currentOrder } = useOrder();

  // ==========================================
  // Estimated Delivery Date
  // ==========================================

  const deliveryDate = new Date();

  deliveryDate.setDate(
    deliveryDate.getDate() + 5
  );

  return (
    <section
      className="
        min-h-screen
        bg-[#f8faf8]
        flex
        items-center
        justify-center
        px-5
        py-10
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          bg-white
          shadow-xl
          p-6
          sm:p-10
          max-w-xl
          w-full
          text-center
        "
        style={{
          borderRadius:
            "var(--border-radius, 24px)",
        }}
      >
        {/* ====================================== */}
        {/* Success Icon */}
        {/* ====================================== */}

        <FaCheckCircle
          className="
            text-green-500
            text-7xl
            sm:text-8xl
            mx-auto
            mb-6
          "
        />

        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-black
          "
        >
          Order Placed!
        </h1>

        <p
          className="
            text-gray-500
            mt-4
            leading-7
          "
        >
          Thank you for shopping with us.
          Your order has been placed
          successfully.
        </p>

        {/* ====================================== */}
        {/* Order Details */}
        {/* ====================================== */}

        <div
          className="
            bg-gray-50
            p-5
            sm:p-6
            mt-8
            space-y-4
          "
          style={{
            borderRadius:
              "var(--border-radius, 16px)",
          }}
        >
          {/* Order ID */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-1
              sm:gap-4
            "
          >
            <span className="font-semibold">
              Order ID
            </span>

            <span
              className="
                font-bold
                break-all
              "
              style={{
                color:
                  "var(--primary-color, #355E3B)",
              }}
            >
              {currentOrder?._id || "N/A"}
            </span>
          </div>

          {/* Total */}

          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold">
              Total Amount
            </span>

            <span
              className="font-bold"
              style={{
                color:
                  "var(--primary-color, #355E3B)",
              }}
            >
              ₹{currentOrder?.total || 0}
            </span>
          </div>

          {/* Delivery */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-1
              sm:gap-4
            "
          >
            <span className="font-semibold">
              Estimated Delivery
            </span>

            <span className="font-bold">
              {deliveryDate.toDateString()}
            </span>
          </div>

          {/* Payment */}

          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold">
              Payment
            </span>

            <span className="text-green-600 font-semibold">
              Successful
            </span>
          </div>
        </div>

        {/* ====================================== */}
        {/* Buttons */}
        {/* ====================================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            sm:flex-row
            gap-4
          "
        >
          {/* Continue Shopping */}

          <Link
            to="/"
            className="
              flex-1
              text-white
              py-3
              px-5
              font-bold
              transition
              duration-300
              hover:opacity-90
            "
            style={{
              backgroundColor:
                "var(--primary-color, #355E3B)",

              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
            Continue Shopping
          </Link>

          {/* View Orders */}

          <Link
            to="/orders"
            className="
              flex-1
              py-3
              px-5
              font-bold
              border
              transition
              duration-300
              hover:opacity-80
            "
            style={{
              color:
                "var(--primary-color, #355E3B)",

              borderColor:
                "var(--primary-color, #355E3B)",

              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
            View Orders
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default OrderSuccess;