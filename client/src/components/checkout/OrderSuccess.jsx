import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useOrder } from "../../context/OrderContext";

const OrderSuccess = () => {
  const { currentOrder } = useOrder();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <section className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center"
      >
        {/* Success Icon */}

        <FaCheckCircle className="text-green-500 text-8xl mx-auto mb-6" />

        {/* Heading */}

        <h1 className="text-4xl font-black">
          Order Placed!
        </h1>

        <p className="text-gray-500 mt-4">
          Thank you for shopping with us.
          Your order has been placed successfully.
        </p>

        {/* Order Details */}

        <div className="bg-gray-50 rounded-2xl p-6 mt-8 space-y-4">

          {/* Order ID */}

          <div className="flex justify-between">
            <span className="font-semibold">
              Order ID
            </span>

            <span className="text-[#355E3B] font-bold">
              {currentOrder?._id || "N/A"}
            </span>
          </div>

          {/* Total */}

          <div className="flex justify-between">
            <span className="font-semibold">
              Total Amount
            </span>

            <span className="font-bold text-[#355E3B]">
              ₹{currentOrder?.total || 0}
            </span>
          </div>

          {/* Delivery */}

          <div className="flex justify-between">
            <span className="font-semibold">
              Estimated Delivery
            </span>

            <span className="font-bold">
              {deliveryDate.toDateString()}
            </span>
          </div>

          {/* Payment */}

          <div className="flex justify-between">
            <span className="font-semibold">
              Payment
            </span>

            <span className="text-green-600 font-semibold">
              Successful
            </span>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col sm:flex-row gap-4">

          <Link
            to="/"
            className="flex-1 bg-[#355E3B] text-white py-3 rounded-xl font-bold hover:bg-[#27452d] transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="flex-1 border border-[#355E3B] text-[#355E3B] py-3 rounded-xl font-bold hover:bg-[#355E3B] hover:text-white transition"
          >
            View Orders
          </Link>

        </div>
      </motion.div>
    </section>
  );
};

export default OrderSuccess;