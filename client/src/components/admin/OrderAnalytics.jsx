import { useEffect, useState } from "react";

import OrderCards from "./OrderCards";
import OrdersTrendChart from "./OrdersTrendChart";
import PaymentMethodChart from "./PaymentMethodChart";
import OrderStatusChart from "./OrderStatusChart";
import RecentOrdersTable from "./RecentOrdersTable";

import { getOrderAnalytics } from "../../services/dashboardService";

const OrderAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getOrderAnalytics();

      setAnalytics(response);
    } catch (error) {
      console.error(
        "Failed to fetch order analytics",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md border p-8 text-center">
        <p className="text-gray-500">
          Loading order analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cards */}

      <OrderCards data={analytics} />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <OrdersTrendChart
          data={analytics?.ordersChart || []}
        />

        <PaymentMethodChart
          data={analytics?.paymentMethods || []}
        />
      </div>

      {/* Order Status */}

      <OrderStatusChart
        data={analytics?.orderStatusChart || []}
      />

      {/* Recent Orders */}

      <RecentOrdersTable
        orders={analytics?.recentOrders || []}
      />
    </div>
  );
};

export default OrderAnalytics;