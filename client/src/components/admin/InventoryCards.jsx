import {
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
  IndianRupee,
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
const InventoryCards = ({ data }) => {
  const cards = [
    {
      title: "Total Products",
      value: data?.totalProducts || 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Stock",
      value: data?.totalStock || 0,
      icon: Boxes,
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: data?.lowStockCount || 0,
      icon: AlertTriangle,
      color: "bg-yellow-500",
    },
    {
      title: "Out Of Stock",
      value: data?.outOfStockCount || 0,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Inventory Value",
value: formatCurrency(
  data?.totalInventoryValue || 0
),
      icon: IndianRupee,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
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

export default InventoryCards;