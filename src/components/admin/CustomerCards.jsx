import {
  Users,
  UserPlus,
  Repeat,
  IndianRupee,
  BadgeDollarSign,
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

  return `₹${amount.toLocaleString("en-IN")}`;
};

const CustomerCards = ({ data }) => {
  const cards = [
    {
      title: "Total Customers",
      value: data?.totalCustomers || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "New Customers",
      value: data?.newCustomers || 0,
      icon: UserPlus,
      color: "bg-green-500",
    },
    {
      title: "Repeat Customers",
      value: data?.repeatCustomers || 0,
      icon: Repeat,
      color: "bg-yellow-500",
    },
    {
      title: "Customer Spending",
      value: formatCurrency(
        data?.totalCustomerSpending || 0
      ),
      icon: IndianRupee,
      color: "bg-purple-500",
    },
    {
      title: "Average Customer Value",
      value: formatCurrency(
        data?.averageCustomerValue || 0
      ),
      icon: BadgeDollarSign,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-lg transition-all"
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

export default CustomerCards;