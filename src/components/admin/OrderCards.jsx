import {
  ShoppingCart,
  IndianRupee,
  CreditCard,
  Truck,
  Clock,
  XCircle,
} from "lucide-react";

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

const OrderCards = ({ data }) => {
  const cards = [
    {
      title: "Total Orders",
      value: data?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data?.totalRevenue || 0),
      icon: IndianRupee,
      color: "bg-green-500",
    },
    {
      title: "Average Order Value",
      value: formatCurrency(
        data?.averageOrderValue || 0
      ),
      icon: CreditCard,
      color: "bg-purple-500",
    },
    {
      title: "Delivered Orders",
      value: data?.deliveredOrders || 0,
      icon: Truck,
      color: "bg-emerald-500",
    },
    {
      title: "Pending Orders",
      value: data?.pendingOrders || 0,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Cancelled Orders",
      value: data?.cancelledOrders || 0,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-md p-5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-xl lg:text-2xl font-bold text-gray-800 break-all">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} p-3 rounded-xl text-white flex-shrink-0`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCards;