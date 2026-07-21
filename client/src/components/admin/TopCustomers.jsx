
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

const TopCustomers = ({ customers = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Top Customers
        </h2>

        <span className="text-sm text-gray-500">
          Top 5 by Spending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead>
            <tr className="border-b bg-gray-50">

              <th className="text-left p-3">
                Customer
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

            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Customer */}

                  <td className="p-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {customer.name}
                      </h3>
                    </div>
                  </td>

                  {/* Email */}

                  <td className="p-3 text-gray-600">
                    {customer.email}
                  </td>

                  {/* Orders */}

                  <td className="p-3 text-center font-semibold">
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
                    {new Date(
                      customer.lastOrder
                    ).toLocaleDateString("en-IN")}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No customer data available.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TopCustomers;
