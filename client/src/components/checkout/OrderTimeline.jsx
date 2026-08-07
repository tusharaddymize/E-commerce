import {
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaBoxOpen,
  FaTimesCircle,
} from "react-icons/fa";

const OrderTimeline = ({ status }) => {
  const steps = [
    {
      title: "Pending",
      icon: <FaClock />,
    },
    {
      title: "Processing",
      icon: <FaBoxOpen />,
    },
    {
      title: "Shipped",
      icon: <FaTruck />,
    },
    {
      title: "Delivered",
      icon: <FaCheckCircle />,
    },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.title === status
  );

  // Cancelled Order
  if (status === "Cancelled") {
    return (
      <div className="bg-white rounded-3xl shadow border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Order Timeline
        </h2>

        <div className="flex items-center gap-4 text-red-600">
          <FaTimesCircle className="text-3xl" />

          <div>
            <h3 className="font-bold text-xl">
              Order Cancelled
            </h3>

            <p className="text-gray-500">
              This order has been cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8">
        Order Timeline
      </h2>

      <div className="space-y-6">

        {steps.map((step, index) => {

          const completed = index <= currentIndex;

          return (
            <div
              key={step.title}
              className="flex items-center gap-5"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ${
                  completed
                    ? "bg-[#355E3B]"
                    : "bg-gray-300"
                }`}
              >
                {step.icon}
              </div>

              <div>
                <h3
                  className={`font-bold ${
                    completed
                      ? "text-[#355E3B]"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h3>

                {completed && (
                  <p className="text-sm text-gray-500">
                    Completed
                  </p>
                )}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default OrderTimeline;