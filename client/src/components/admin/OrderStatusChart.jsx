import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#F59E0B", // Pending
  "#3B82F6", // Processing
  "#8B5CF6", // Shipped
  "#10B981", // Delivered
  "#EF4444", // Cancelled
];

const OrderStatusChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Order Status Distribution
      </h2>

      <div className="w-full h-80">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  value,
                  "Orders",
                ]}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No order status data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusChart;