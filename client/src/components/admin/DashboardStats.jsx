import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  Clock3,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import { getDashboardOverview } from "../../services/dashboardService";

const DashboardStats = () => {
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    todayOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Dashboard Overview
  // ===============================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await getDashboardOverview();

        if (res.success) {
          setOverview(res.overview);
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ===============================
  // Currency Formatter
  // ===============================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // ===============================
  // Dashboard Cards
  // ===============================

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(overview.totalRevenue),
      icon: <IndianRupee size={28} />,
      color: "bg-emerald-100 text-emerald-700",
    },

    {
      title: "Total Orders",
      value: overview.totalOrders,
      icon: <ShoppingCart size={28} />,
      color: "bg-blue-100 text-blue-700",
    },

    {
      title: "Total Products",
      value: overview.totalProducts,
      icon: <Package size={28} />,
      color: "bg-purple-100 text-purple-700",
    },

    {
      title: "Total Users",
      value: overview.totalUsers,
      icon: <Users size={28} />,
      color: "bg-orange-100 text-orange-700",
    },

    {
      title: "Today's Orders",
      value: overview.todayOrders,
      icon: <Clock3 size={28} />,
      color: "bg-cyan-100 text-cyan-700",
    },

    {
      title: "Pending Orders",
      value: overview.pendingOrders,
      icon: <Clock3 size={28} />,
      color: "bg-yellow-100 text-yellow-700",
    },

    {
      title: "Delivered Orders",
      value: overview.deliveredOrders,
      icon: <CheckCircle2 size={28} />,
      color: "bg-green-100 text-green-700",
    },

    {
      title: "Cancelled Orders",
      value: overview.cancelledOrders,
      icon: <XCircle size={28} />,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
        lg:gap-6
      "
    >
      {stats.map((item) => (
        <DashboardCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default DashboardStats;