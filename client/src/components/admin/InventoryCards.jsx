import {
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
  IndianRupee,
} from "lucide-react";

// ==========================================
// Currency Formatter
// ==========================================

const formatCurrency = (amount = 0) => {
  const value = Number(amount) || 0;

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(2)} K`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const InventoryCards = ({ data }) => {
  // ==========================================
  // Cards Data
  // ==========================================

  const cards = [
    {
      title: "Total Products",
      value: data?.totalProducts ?? 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Stock",
      value: data?.totalStock ?? 0,
      icon: Boxes,
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: data?.lowStockCount ?? 0,
      icon: AlertTriangle,
      color: "bg-yellow-500",
    },
    {
      title: "Out Of Stock",
      value: data?.outOfStockCount ?? 0,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Inventory Value",
      value: formatCurrency(data?.totalInventoryValue),
      icon: IndianRupee,
      color: "bg-purple-500",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
        gap-4
        lg:gap-6
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              min-w-0
              bg-white
              rounded-2xl
              border
              border-gray-200
              shadow-md
              hover:shadow-lg
              transition-all
              duration-300
              p-5
            "
          >
            <div className="flex items-center justify-between gap-4 min-w-0">

              {/* Content */}

              <div className="min-w-0 flex-1">
                <p className="text-gray-500 text-sm font-medium">
                  {card.title}
                </p>

                <h2
                  className="
                    mt-2
                    text-xl
                    lg:text-2xl
                    font-bold
                    text-gray-800
                    whitespace-nowrap
                  "
                >
                  {card.value}
                </h2>
              </div>

              {/* Icon */}

              <div
                className={`
                  ${card.color}
                  w-12
                  h-12
                  rounded-xl
                  text-white
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                `}
              >
                <Icon size={25} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryCards;