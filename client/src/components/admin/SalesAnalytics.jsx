import { useEffect, useState } from "react";
import {
  ShoppingCart,
  BadgeIndianRupee,
  CreditCard,
  TrendingUp,
} from "lucide-react";

import { getSalesAnalytics } from "../../services/dashboardService";

const SalesCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

const SalesAnalytics = () => {
  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState({
    totalSales: 0,
    totalOrders: 0,
    paidOrders: 0,
    averageOrderValue: 0,
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSalesAnalytics();

        setSales({
          totalSales: data.totalSales || 0,
          totalOrders: data.totalOrders || 0,
          paidOrders: data.paidOrders || 0,
          averageOrderValue:
            data.averageOrderValue || 0,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 bg-slate-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Sales Analytics
        </h2>

        <p className="text-slate-500 mt-1">
          Overall sales performance of your store.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <SalesCard
          title="Total Sales"
          value={`₹${Number(
            sales.totalSales
          ).toLocaleString("en-IN")}`}
          icon={BadgeIndianRupee}
        />

        <SalesCard
          title="Total Orders"
          value={sales.totalOrders}
          icon={ShoppingCart}
        />

        <SalesCard
          title="Paid Orders"
          value={sales.paidOrders}
          icon={CreditCard}
        />

        <SalesCard
          title="Average Order Value"
          value={`₹${Number(
            sales.averageOrderValue
          ).toLocaleString("en-IN")}`}
          icon={TrendingUp}
        />
      </div>
    </section>
  );
};

export default SalesAnalytics;