import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import OrderTimeline from "../components/checkout/OrderTimeline";
import { getOrderById } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const response = await getOrderById(id);

      setOrder(response.order || response);

    } catch (err) {
      console.error(err);
      setError("Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />

        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Loading Order...
          </h1>
        </section>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />

        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl text-red-500 font-bold">
            {error}
          </h1>
        </section>

        <Footer />
      </>
    );
  }

  const product = order.items?.[0];

  return (
    <>
      <Header />

      <section className="bg-[#f8faf8] min-h-screen py-10">

        <div className="max-w-[1450px] mx-auto px-5">

          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-[#355E3B] font-semibold mb-8"
          >
            <FaArrowLeft />
            Back to Orders
          </Link>

          {/* Header */}

          <div className="bg-white rounded-3xl shadow border p-8">

            <div className="flex justify-between flex-wrap gap-4">

              <div>

                <h1 className="text-4xl font-black">
                  Order Details
                </h1>

                <p className="text-gray-500 mt-2">
                  Order ID :

                  <span className="font-bold ml-2">
                    {order._id}
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
                src={product?.image}
                alt={product?.title}
                className="w-56 h-56 rounded-2xl border object-cover"
              />

              <div className="flex-1">

                <h2 className="text-3xl font-bold">
                  {product?.title}
                </h2>

                <p className="mt-4 text-lg">
                  Quantity :
                  <strong> {product?.quantity}</strong>
                </p>

                <p className="mt-2 text-lg">
                  Price :
                  <strong> ₹{product?.price}</strong>
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

              <p>{order.shippingAddress?.fullName}</p>

              <p>{order.shippingAddress?.mobile}</p>

              <p>{order.shippingAddress?.email}</p>

              <p>{order.shippingAddress?.address}</p>

              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>

              <p>
                {order.shippingAddress?.country} -
                {order.shippingAddress?.pincode}
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
                  {order.paymentMethod}
                </span>

              </div>

            </div>

          </div>

          {/* Timeline */}

          <div className="mt-8">

            <OrderTimeline
              status={order.status}
            />

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
};

export default OrderDetails;