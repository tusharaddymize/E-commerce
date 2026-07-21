import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import OrderCard from "../components/checkout/OrderCard";
import { getOrders } from "../services/orderService";
import EmptyOrders from "../components/orders/EmptyOrders";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorState from "../components/common/ErrorState";
const Orders = () => {
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");


const [currentPage, setCurrentPage] = useState(1);

const ordersPerPage = 6;


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


const filteredOrders = orders.filter((order) => {
const matchSearch = (order._id || "")
  .toLowerCase()
  .includes(search.toLowerCase());

  const matchStatus =
    statusFilter === "All"
      ? true
      : order.orderStatus === statusFilter;

  return matchSearch && matchStatus;
});


const indexOfLastOrder =
  currentPage * ordersPerPage;

const indexOfFirstOrder =
  indexOfLastOrder - ordersPerPage;

const currentOrders =
  filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

const totalPages = Math.ceil(
  filteredOrders.length / ordersPerPage
);




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

  <div className="flex flex-col md:flex-row gap-4 mt-8">

    <input
      type="text"
      placeholder="Search Order ID..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 h-12 border rounded-xl px-4 outline-none focus:border-[#355E3B]"
    />

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="h-12 border rounded-xl px-4"
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>

  </div>

</div>

          {/* Loading */}

{loading && (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
)}

          {/* Error */}

{!loading && error && (
  <ErrorState
    title="Failed to Load Orders"
    message={error}
    onRetry={fetchOrders}
  />
)}

          {/* Empty Orders */}
{/* Empty Orders */}

{!loading &&
  !error &&
filteredOrders.length === 0 && (
    <EmptyOrders />
)}

{/* Orders */}

{!loading &&
  !error &&
  filteredOrders.length > 0 && (
    <>
      <div className="space-y-6">

        {currentOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))}

      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-5 py-2 rounded-lg border disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`w-10 h-10 rounded-lg ${
                currentPage === index + 1
                  ? "bg-[#355E3B] text-white"
                  : "border"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-5 py-2 rounded-lg border disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}
    </>
)}





        </div>
      </section>

      <Footer />
    </>
  );
};

export default Orders;