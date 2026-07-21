import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const OrdersTrendChart = ({ data = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Monthly Orders Trend
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `${value} Orders`,
                "Orders",
              ]}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersTrendChart;