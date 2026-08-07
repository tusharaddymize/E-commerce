import {
  FaChartLine,
  FaGift,
  FaLayerGroup,
} from "react-icons/fa";

const CouponAnalytics = ({ analytics = {} }) => {
  const items = [
    {
      title: "Coupons Used",
      value: analytics.totalUsage || 0,
      icon: <FaGift />,
      color: "text-green-600",
    },
    {
      title: "Remaining Usage",
      value: analytics.remainingUsage || 0,
      icon: <FaLayerGroup />,
      color: "text-blue-600",
    },
    {
      title: "Usage Rate",
      value:
        analytics.totalUsage + analytics.remainingUsage > 0
          ? `${Math.round(
              (analytics.totalUsage /
                (analytics.totalUsage +
                  analytics.remainingUsage)) *
                100
            )}%`
          : "0%",
      icon: <FaChartLine />,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Coupon Analytics
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border p-5 transition hover:bg-gray-50"
          >

            <div className={`mb-3 text-2xl ${item.color}`}>
              {item.icon}
            </div>

            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {item.value}
            </h3>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CouponAnalytics;