import {
  FaTicketAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const CouponStats = ({ analytics = {} }) => {
  const cards = [
    {
      title: "Total Coupons",
      value: analytics.totalCoupons || 0,
      icon: <FaTicketAlt size={22} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Active Coupons",
      value: analytics.activeCoupons || 0,
      icon: <FaCheckCircle size={22} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Inactive Coupons",
      value: analytics.inactiveCoupons || 0,
      icon: <FaTimesCircle size={22} />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Expired Coupons",
      value: analytics.expiredCoupons || 0,
      icon: <FaClock size={22} />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {card.value}
              </h2>

            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full ${card.bg} ${card.color}`}
            >
              {card.icon}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default CouponStats;