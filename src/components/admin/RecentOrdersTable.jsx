import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)} K`;
  }

  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
};

const getPaymentStatusClass = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Failed":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getOrderStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Shipped":
      return "bg-purple-100 text-purple-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentOrdersTable = ({ orders = [] }) => {
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase();

    return orders.filter((order) => {
      return (
        order.customer?.name
          ?.toLowerCase()
          .includes(keyword) ||
        order.customer?.email
          ?.toLowerCase()
          .includes(keyword) ||
        order.paymentMethod
          ?.toLowerCase()
          .includes(keyword) ||
        order.orderStatus
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [orders, search]);

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Orders
        </h2>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">
                Customer
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-right p-3">
                Amount
              </th>

              <th className="text-center p-3">
                Payment
              </th>

              <th className="text-center p-3">
                Payment Status
              </th>

              <th className="text-center p-3">
                Order Status
              </th>

              <th className="text-center p-3">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    {order.customer?.name}
                  </td>

                  <td className="p-3 text-gray-600">
                    {order.customer?.email}
                  </td>

                  <td className="p-3 text-right font-semibold text-green-600">
                    {formatCurrency(order.total)}
                  </td>

                  <td className="p-3 text-center">
                    {order.paymentMethod}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusClass(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="p-3 text-center text-gray-600">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;