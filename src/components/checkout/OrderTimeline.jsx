import { Link, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import OrderTimeline from "../components/checkout/OrderTimeline";
import { FaArrowLeft } from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();

  // Dummy Data (Later MongoDB se aayega)
  const order = {
    id,
    title: "Men's Premium T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
    quantity: 2,
    price: 1499,
    subtotal: 2998,
    shipping: 0,
    gst: 540,
    discount: 300,
    total: 3238,
    payment: "Cash On Delivery",
    status: "Shipped",

    address: {
      fullName: "Tushar Raghav",
      mobile: "9876543210",
      email: "tushar@gmail.com",
      country: "India",
      state: "Uttar Pradesh",
      city: "Ghaziabad",
      pincode: "201001",
      address: "Raj Nagar, Ghaziabad",
    },
  };

  return (
    <>
      <Header />

      <section className="bg-[#f8faf8] min-h-screen py-10">

        <div className="max-w-[1450px] mx-auto px-5">

          {/* Back */}

          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-[#355E3B] font-semibold mb-8"
          >
            <FaArrowLeft />
            Back to Orders
          </Link>

          {/* Heading */}

          <div className="bg-white rounded-3xl shadow border p-8">

            <div className="flex justify-between flex-wrap gap-4">

              <div>

                <h1 className="text-4xl font-black">
                  Order Details
                </h1>

                <p className="text-gray-500 mt-2">
                  Order ID :
                  <span className="font-bold ml-2">
                    {order.id}
                  </span>
                </p>

              </div>

              <span className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold h-fit">
                {order.status}
              </span>

            </div>

          </div>

          {/* Product */}

          <div className="bg-white rounded-3xl shadow border p-8 mt-8">

            <div className="flex flex-col md:flex-row gap-8">

              <img
                src={order.image}
                alt={order.title}
                className="w-56 h-56 rounded-2xl border object-cover"
              />

              <div className="flex-1">

                <h2 className="text-3xl font-bold">
                  {order.title}
                </h2>

                <p className="mt-4 text-lg">
                  Quantity :
                  <strong> {order.quantity}</strong>
                </p>

                <p className="mt-2 text-lg">
                  Price :
                  <strong> ₹{order.price}</strong>
                </p>

              </div>

            </div>

          </div>

          {/* Address */}

          <div className="bg-white rounded-3xl shadow border p-8 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Delivery Address
            </h2>

            <div className="space-y-2">

              <p>{order.address.fullName}</p>

              <p>{order.address.mobile}</p>

              <p>{order.address.email}</p>

              <p>
                {order.address.address}
              </p>

              <p>
                {order.address.city},{" "}
                {order.address.state}
              </p>

              <p>
                {order.address.country} -
                {order.address.pincode}
              </p>

            </div>

          </div>

          {/* Payment */}

          <div className="bg-white rounded-3xl shadow border p-8 mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Payment Details
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0
                    ? "FREE"
                    : `₹${order.shipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{order.gst}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-2xl font-black">

                <span>Total</span>

                <span className="text-[#355E3B]">
                  ₹{order.total}
                </span>

              </div>

              <div className="mt-5">

                <span className="font-semibold">
                  Payment Method :
                </span>

                <span className="ml-2">
                  {order.payment}
                </span>

              </div>

            </div>

          </div>

          {/* Timeline */}

          <div className="mt-8">
            <OrderTimeline status={order.status} />
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default OrderDetails;