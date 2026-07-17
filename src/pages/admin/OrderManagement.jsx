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
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

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

  const handleStatusChange = async (
    id,
    orderStatus
  ) => {
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
    return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar title="Order Management" />

        <div className="p-6">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Filter */}
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center py-16 text-gray-500">
              Loading orders...
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Items</th>
                      <th className="px-4 py-3 text-left">Total</th>
                      <th className="px-4 py-3 text-left">Payment</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-10 text-gray-500"
                        >
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-4">
                            <div className="font-semibold">
                              {order.userId?.name || "Unknown"}
                            </div>

                            <div className="text-sm text-gray-500">
                              {order.userId?.email}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            {order.items?.length || 0}
                          </td>

                          <td className="px-4 py-4 font-semibold">
                            ₹{order.total}
                          </td>

                          <td className="px-4 py-4">
                            {order.paymentStatus}
                          </td>

                          <td className="px-4 py-4">
                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                handleStatusChange(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="border rounded px-2 py-1"
                            >
                              <option>Pending</option>
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>

                          <td className="px-4 py-4">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </td>
<td className="px-4 py-4">
  <div className="flex justify-center gap-3">
    <Link
      to={`/admin/orders/${order._id}`}
      className="text-blue-600 hover:text-blue-800"
      title="View Details"
    >
      <Eye size={18} />
    </Link>

    <button
      onClick={() => handleDelete(order._id)}
      className="text-red-600 hover:text-red-800"
      title="Delete Order"
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

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="font-medium">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;