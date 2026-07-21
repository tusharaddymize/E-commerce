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

  return `₹${amount.toLocaleString("en-IN")}`;
};

const CustomerTable = ({ customers = [] }) => {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const keyword = search.toLowerCase();

      return (
        customer.name?.toLowerCase().includes(keyword) ||
        customer.email?.toLowerCase().includes(keyword)
      );
    });
  }, [customers, search]);

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Customer List
        </h2>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
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
                Name
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-center p-3">
                Orders
              </th>

              <th className="text-right p-3">
                Total Spending
              </th>

              <th className="text-center p-3">
                Last Order
              </th>

              <th className="text-center p-3">
                Status
              </th>

            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Name */}

                  <td className="p-3 font-medium text-gray-800">
                    {customer.name}
                  </td>

                  {/* Email */}

                  <td className="p-3 text-gray-600">
                    {customer.email}
                  </td>

                  {/* Orders */}

                  <td className="p-3 text-center">
                    {customer.totalOrders}
                  </td>

                  {/* Spending */}

                  <td className="p-3 text-right font-semibold text-green-600">
                    {formatCurrency(
                      customer.totalSpent
                    )}
                  </td>

                  {/* Last Order */}

                  <td className="p-3 text-center text-gray-600">
                    {customer.lastOrder
                      ? new Date(
                          customer.lastOrder
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </td>

                  {/* Status */}

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.totalOrders > 5
                          ? "bg-green-100 text-green-700"
                          : customer.totalOrders > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.totalOrders > 5
                        ? "VIP"
                        : customer.totalOrders > 0
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CustomerTable;