import { Eye } from "lucide-react";

const RecentSalesTable = ({ orders = [] }) => {
  return (
    <section className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Recent Sales
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest customer orders.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Order..."
          className="w-full sm:w-72 rounded-xl border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4">Order ID</th>
              <th className="text-left px-6 py-4">Customer</th>
              <th className="text-left px-6 py-4">Amount</th>
              <th className="text-left px-6 py-4">Payment</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-center px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-12 text-slate-500"
                >
                  No recent sales found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    #{order._id?.slice(-6)}
                  </td>

                  <td className="px-6 py-4">
                    {order.user?.name || "Customer"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {order.orderStatus}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button className="p-2 rounded-lg hover:bg-slate-100">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No recent sales found.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  #{order._id?.slice(-6)}
                </h3>

                <span className="text-green-600 font-bold">
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-600">
                {order.user?.name || "Customer"}
              </p>

              <div className="flex justify-between mt-3 text-sm">
                <span>{order.paymentStatus}</span>

                <span>{order.orderStatus}</span>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentSalesTable;