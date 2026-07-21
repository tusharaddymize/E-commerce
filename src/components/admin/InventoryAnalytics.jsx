import { useEffect, useState } from "react";

import {
  getInventoryAnalytics,
} from "../../services/dashboardService";

import InventoryCards from "./InventoryCards";
import InventoryChart from "./InventoryChart";
import CategoryStockChart from "./CategoryStockChart";
import StockStatusChart from "./StockStatusChart";
import InventoryTable from "./InventoryTable";

const InventoryAnalytics = () => {
  const [inventory, setInventory] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const data = await getInventoryAnalytics();

      setInventory(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load inventory analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading inventory analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-600 rounded-xl p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Cards */}

      <InventoryCards data={inventory} />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <InventoryChart
          data={inventory.categoryStock}
        />

        <CategoryStockChart
          data={inventory.categoryStock}
        />

      </div>

      {/* Stock Status */}

      <StockStatusChart
        data={inventory.stockStatus}
      />

      {/* Inventory Table */}

      <InventoryTable
        products={inventory.topInventoryProducts}
      />

    </div>
  );
};

export default InventoryAnalytics;