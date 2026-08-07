import { useEffect, useState } from "react";

import CustomerCards from "./CustomerCards";
import CustomerGrowthChart from "./CustomerGrowthChart";
import TopCustomers from "./TopCustomers";
import CustomerTable from "./CustomerTable";

import { getCustomerAnalytics } from "../../services/dashboardService";

const CustomerAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getCustomerAnalytics();

      setAnalytics(response);
    } catch (error) {
      console.error(
        "Failed to fetch customer analytics",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <p className="text-gray-500">
          Loading customer analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cards */}

      <CustomerCards data={analytics} />

      {/* Growth Chart + Top Customers */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <CustomerGrowthChart
          data={analytics?.customerGrowth || []}
        />

        <TopCustomers
          customers={analytics?.topCustomers || []}
        />
      </div>

      {/* Customer Table */}

      <CustomerTable
        customers={analytics?.topCustomers || []}
      />
    </div>
  );
};

export default CustomerAnalytics;