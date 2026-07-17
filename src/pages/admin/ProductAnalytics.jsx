import { useEffect, useState } from "react";
import {
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
  Star,
  Flame,
  IndianRupee,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AnalyticsCard from "../../components/admin/AnalyticsCard";

import { getProductAnalytics } from "../../services/analyticsService";

const ProductAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const data = await getProductAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <AdminSidebar />

        <div className="flex-1">
          <AdminNavbar />

          <div className="p-8 text-center text-gray-500">
            Loading Analytics...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-8">

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Product Analytics
            </h1>

            <p className="mt-2 text-gray-500">
              Overview of products and inventory.
            </p>
          </div>

          {/* Cards */}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <AnalyticsCard
              title="Total Products"
              value={analytics.totalProducts}
              icon={Package}
              color="green"
            />

            <AnalyticsCard
              title="Active Products"
              value={analytics.activeProducts}
              icon={Boxes}
              color="blue"
            />

            <AnalyticsCard
              title="Draft Products"
              value={analytics.draftProducts}
              icon={XCircle}
              color="yellow"
            />

            <AnalyticsCard
              title="Low Stock"
              value={analytics.lowStockProducts}
              icon={AlertTriangle}
              color="red"
            />

            <AnalyticsCard
              title="Out Of Stock"
              value={analytics.outOfStockProducts}
              icon={XCircle}
              color="red"
            />

            <AnalyticsCard
              title="Featured"
              value={analytics.featuredProducts}
              icon={Star}
              color="purple"
            />

            <AnalyticsCard
              title="Trending"
              value={analytics.trendingProducts}
              icon={Flame}
              color="indigo"
            />

            <AnalyticsCard
              title="Inventory Value"
              value={`₹${analytics.inventoryValue.toLocaleString()}`}
              icon={IndianRupee}
              color="green"
            />

          </div>

          {/* Bottom Section */}

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            {/* Categories */}

            <div className="rounded-xl bg-white p-6 shadow">

              <h2 className="mb-5 text-xl font-semibold">
                Categories
              </h2>

              <div className="space-y-4">

                {analytics.categoryAnalytics.length === 0 ? (
                  <p className="text-gray-500">
                    No Categories Found
                  </p>
                ) : (
                  analytics.categoryAnalytics.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <span className="font-medium">
                        {item._id}
                      </span>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        {item.totalProducts}
                      </span>
                    </div>
                  ))
                )}

              </div>
            </div>

            {/* Recent Products */}

            <div className="rounded-xl bg-white p-6 shadow">

              <h2 className="mb-5 text-xl font-semibold">
                Recently Added
              </h2>

              <div className="space-y-4">

                {analytics.recentProducts.length === 0 ? (
                  <p className="text-gray-500">
                    No Products
                  </p>
                ) : (
                  analytics.recentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {product.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>

                      </div>

                      <div className="font-semibold text-green-700">
                        ₹{product.price}
                      </div>

                    </div>
                  ))
                )}

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default ProductAnalytics;