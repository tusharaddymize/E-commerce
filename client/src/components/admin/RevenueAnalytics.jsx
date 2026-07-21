import { useEffect, useState } from "react";
import {
  IndianRupee,
  CalendarDays,
  CalendarRange,
  Calendar,
} from "lucide-react";

import { getRevenueAnalytics } from "../../services/dashboardService";
import RevenueChart from "./RevenueChart";

const RevenueCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            ₹{Number(value || 0).toLocaleString("en-IN")}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
  );
};

const RevenueAnalytics = () => {
  const [loading, setLoading] = useState(true);

  const [revenue, setRevenue] = useState({
    todayRevenue: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    monthlyChart: [],
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const data = await getRevenueAnalytics();

        setRevenue({
          todayRevenue: data.todayRevenue || 0,
          weeklyRevenue: data.weeklyRevenue || 0,
          monthlyRevenue: data.monthlyRevenue || 0,
          yearlyRevenue: data.yearlyRevenue || 0,
          monthlyChart: data.monthlyChart || [],
        });
      } catch (err) {
        console.error("Revenue Analytics Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  if (loading) {
    return (
      <section className="mt-10">
        <div className="mb-6">
          <div className="h-8 w-56 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-4 w-72 bg-slate-200 rounded mt-3 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl bg-slate-200 animate-pulse"
            />
          ))}
        </div>

        <div className="mt-8 h-96 rounded-2xl bg-slate-200 animate-pulse"></div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Revenue Analytics
        </h2>

        <p className="text-slate-500 mt-1">
          Revenue overview for different time periods.
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <RevenueCard
          title="Today's Revenue"
          value={revenue.todayRevenue}
          icon={IndianRupee}
        />

        <RevenueCard
          title="Weekly Revenue"
          value={revenue.weeklyRevenue}
          icon={CalendarDays}
        />

        <RevenueCard
          title="Monthly Revenue"
          value={revenue.monthlyRevenue}
          icon={CalendarRange}
        />

        <RevenueCard
          title="Yearly Revenue"
          value={revenue.yearlyRevenue}
          icon={Calendar}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart
        data={revenue.monthlyChart}
      />
    </section>
  );
};

export default RevenueAnalytics;