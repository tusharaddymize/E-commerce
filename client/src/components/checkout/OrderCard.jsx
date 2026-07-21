import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-indigo-100 text-indigo-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // First Product
  const product = order.items?.[0];

  return (
    <div className="bg-white rounded-3xl shadow-md border p-6 hover:shadow-xl transition">

      <div className="flex flex-col md:flex-row gap-6">

        {/* Product Image */}

        <img
          src={product?.image || "/placeholder.png"}
          alt={product?.title || "Product"}
          className="w-36 h-36 rounded-2xl object-cover border"
        />

        {/* Order Details */}

        <div className="flex-1">

          <div className="flex justify-between items-start flex-wrap gap-3">

            <div>

              <h2 className="text-2xl font-bold">
                {product?.title || "Product"}
              </h2>

              <p className="text-gray-500 mt-2">
                Order ID :
                <span className="font-semibold ml-2">
                  {order._id}
                </span>
              </p>

              <p className="text-gray-500">
                Ordered On :
                <span className="ml-2">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </span>
              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}
            >
              {order.status}
            </span>

          </div>

          {/* Bottom */}

          <div className="flex justify-between items-center mt-8 flex-wrap gap-4">

            <div>

              <p className="text-gray-500">
                Total Amount
              </p>

              <h3 className="text-3xl font-black text-[#355E3B]">
                ₹{order.total}
              </h3>

            </div>

            <Link
              to={`/orders/${order._id}`}
              className="flex items-center gap-2 bg-[#355E3B] text-white px-6 py-3 rounded-xl hover:bg-[#27452d] transition"
            >
              <FaBoxOpen />

              View Details

              <FiArrowRight />

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderCard;