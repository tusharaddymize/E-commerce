const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
  color = "green",
}) => {
  const colors = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
  };

  const current = colors[color] || colors.green;

  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-full p-4 ${current.bg}`}
        >
          {Icon && (
            <Icon
              size={30}
              className={current.text}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;