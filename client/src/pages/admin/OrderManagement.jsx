import { useEffect, useState } from "react";
import { Search, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  getAdminOrders,
  updateOrderStatus,
  deleteAdminOrder,
} from "../../services/orderService";

const OrderManagement = () => {
  // ===========================
  // States
  // ===========================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Responsive Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const limit = 10;

  // ===========================
  // Load Orders
  // ===========================

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getAdminOrders({
        page,
        limit,
        search,
        status,
      });

      setOrders(data.orders);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, search, status]);

  // ===========================
  // Update Status
  // ===========================

  const handleStatusChange = async (id, orderStatus) => {
    try {
      await updateOrderStatus(id, orderStatus);

      toast.success("Order updated");

      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  // ===========================
  // Delete Order
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAdminOrder(id);

      toast.success("Order deleted");

      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex">

          <AdminSidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />

          <div className="flex-1 min-w-0 flex flex-col">

            <AdminNavbar
              setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-1 items-center justify-center p-6">

              <div className="rounded-2xl border border-gray-200 bg-white px-10 py-10 shadow-sm">

                <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <h2 className="text-center text-xl font-bold text-gray-800">
                  Loading Orders...
                </h2>

                <p className="mt-2 text-center text-gray-500">
                  Please wait while we fetch all customer orders.
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="flex">

        {/* Sidebar */}

        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Main Content */}

        <div className="flex-1 min-w-0 flex flex-col">

          {/* Navbar */}

          <AdminNavbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* Page */}

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {/* ===========================
                Header
            =========================== */}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  Order Management
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Manage customer orders, update order status and monitor deliveries.
                </p>

              </div>

              {/* Summary Card */}

              <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 shadow-sm">

                <p className="text-sm text-gray-500">
                  Orders On This Page
                </p>

                <h2 className="mt-1 text-3xl font-bold text-green-700">
                  {orders.length}
                </h2>

              </div>

            </div>

            {/* ===========================
                Search & Filter
            =========================== */}

            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                {/* Search */}

                <div className="relative flex-1">

                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search by customer name or email..."
                    value={search}
                    onChange={(e) => {
                      setPage(1);
                      setSearch(e.target.value);
                    }}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      py-3
                      pl-12
                      pr-4
                      outline-none
                      transition-all
                      duration-200
                      focus:border-green-600
                      focus:ring-4
                      focus:ring-green-100
                    "
                  />

                </div>

                {/* Filter */}

                <select
                  value={status}
                  onChange={(e) => {
                    setPage(1);
                    setStatus(e.target.value);
                  }}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition-all
                    duration-200
                    focus:border-green-600
                    focus:ring-4
                    focus:ring-green-100
                    lg:w-64
                  "
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

              </div>

            </div>

            {/* ===========================
                Loading
            =========================== */}

            {loading ? (

              <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center shadow-sm">

                <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <p className="text-gray-500">
                  Loading Orders...
                </p>

              </div>

            ) : (
                            <>
                {/* ===========================
                    Desktop Table
                =========================== */}

                <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="min-w-full">

                      <thead className="bg-green-700 text-white">

                        <tr>

                          <th className="px-5 py-4 text-left font-semibold">
                            Customer
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Items
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Total
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Payment
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Status
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Date
                          </th>

                          <th className="px-5 py-4 text-center font-semibold">
                            Actions
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {orders.length === 0 ? (

                          <tr>

                            <td
                              colSpan={7}
                              className="py-16 text-center text-gray-500"
                            >
                              No Orders Found
                            </td>

                          </tr>

                        ) : (

                          orders.map((order) => (

                            <tr
                              key={order._id}
                              className="border-b transition hover:bg-green-50"
                            >

                              <td className="px-5 py-5">

                                <h3 className="font-semibold text-gray-800">
                                {order.shippingAddress?.fullName || order.userId?.name || "Unknown"}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                  {order.shippingAddress?.email || order.userId?.email}
                                </p>

                              </td>

                              <td className="px-5 py-5">
                                {order.items?.length || 0}
                              </td>

                              <td className="px-5 py-5 font-bold text-green-700">
                                ₹{order.total}
                              </td>

                              <td className="px-5 py-5">
                                {order.paymentStatus}
                              </td>

                              <td className="px-5 py-5">

                                <select
                                  value={order.orderStatus}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      order._id,
                                      e.target.value
                                    )
                                  }
                                  className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
                                >
                                  <option>Pending</option>
                                  <option>Processing</option>
                                  <option>Shipped</option>
                                  <option>Delivered</option>
                                  <option>Cancelled</option>
                                </select>

                              </td>

                              <td className="px-5 py-5">
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString()}
                              </td>

                              <td className="px-5 py-5">

                                <div className="flex justify-center gap-3">

                                  <Link
                                    to={`/admin/orders/${order._id}`}
                                    className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                  >
                                    <Eye size={18} />
                                  </Link>

                                  <button
                                    onClick={() =>
                                      handleDelete(order._id)
                                    }
                                    className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                  >
                                    <Trash2 size={18} />
                                  </button>

                                </div>

                              </td>

                            </tr>

                          ))

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

                {/* ===========================
                    Mobile Cards
                =========================== */}

                <div className="space-y-5 lg:hidden">

                  {orders.length === 0 ? (

                    <div className="rounded-2xl bg-white py-16 text-center shadow">
                      No Orders Found
                    </div>

                  ) : (

                    orders.map((order) => (

                      <div
                        key={order._id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <h3 className="font-semibold text-gray-800">
                              {order.userId?.name || "Unknown"}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {order.userId?.email}
                            </p>

                          </div>

                          <span className="font-bold text-green-700">
                            ₹{order.total}
                          </span>

                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                          <div>

                            <p className="text-gray-500">
                              Items
                            </p>

                            <p className="font-semibold">
                              {order.items?.length || 0}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500">
                              Payment
                            </p>

                            <p className="font-semibold">
                              {order.paymentStatus}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500">
                              Date
                            </p>

                            <p className="font-semibold">
                              {new Date(
                                order.createdAt
                              ).toLocaleDateString()}
                            </p>

                          </div>

                          <div>

                            <p className="text-gray-500 mb-2">
                              Status
                            </p>

                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                handleStatusChange(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            >
                              <option>Pending</option>
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>

                          </div>

                        </div>

                        <div className="mt-5 flex gap-3">

                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                          >
                            <Eye size={18} className="mr-2" />
                            View
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(order._id)
                            }
                            className="flex flex-1 items-center justify-center rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
                          >
                            <Trash2 size={18} className="mr-2" />
                            Delete
                          </button>

                        </div>

                      </div>

                    ))

                  )}

                </div>
                                {/* ===========================
                    Pagination
                =========================== */}

                <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row">

                  <p className="text-sm text-gray-500">
                    Page <span className="font-semibold">{page}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </p>

                  <div className="flex gap-3">

                    <button
                      disabled={page === 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        px-5
                        py-2.5
                        font-medium
                        transition
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Previous
                    </button>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="
                        rounded-xl
                        bg-green-600
                        px-5
                        py-2.5
                        font-medium
                        text-white
                        transition
                        hover:bg-green-700
                        disabled:cursor-not-allowed
                        disabled:bg-gray-400
                      "
                    >
                      Next
                    </button>

                  </div>

                </div>

              </>

            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default OrderManagement;