import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import OrderCard from "../components/checkout/OrderCard";
import { getOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      // Backend may return either { orders: [...] } or [...]
      setOrders(response.orders || response);

    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <section className="bg-[#f8faf8] min-h-screen py-10">
        <div className="max-w-[1450px] mx-auto px-5">

          {/* Heading */}

          <div className="mb-10">

            <h1 className="text-5xl font-black">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Track all your orders.
            </p>

          </div>

          {/* Loading */}

          {loading && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">
                Loading Orders...
              </h2>
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="text-center py-20">

              <h2 className="text-2xl font-bold text-red-500">
                {error}
              </h2>

            </div>
          )}

          {/* Empty Orders */}

          {!loading &&
            !error &&
            orders.length === 0 && (
              <div className="text-center py-20">

                <h2 className="text-3xl font-bold">
                  No Orders Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Start shopping to place your first order.
                </p>

              </div>
            )}

          {/* Orders */}

          {!loading &&
            !error &&
            orders.length > 0 && (
              <div className="space-y-6">

                {orders.map((order) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                  />
                ))}

              </div>
            )}

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Orders;