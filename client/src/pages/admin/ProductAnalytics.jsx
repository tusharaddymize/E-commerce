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

  // ✅ Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex">
          <AdminSidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />

          <div className="flex-1 min-w-0 flex flex-col">

            <AdminNavbar
              setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-1 items-center justify-center p-6">

              <div className="rounded-2xl bg-white shadow-sm border border-gray-200 px-10 py-10">

                <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  Loading Analytics...
                </h2>

                <p className="mt-2 text-center text-gray-500">
                  Please wait while we fetch product analytics.
                </p>

              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="flex">

        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Navbar */}
          <AdminNavbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  Product Analytics
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Track inventory, product performance and stock insights.
                </p>
              </div>

            </div>

           
                          {/* Analytics Cards */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

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
                color="rose"
              />

              <AnalyticsCard
                title="Featured Products"
                value={analytics.featuredProducts}
                icon={Star}
                color="purple"
              />

              <AnalyticsCard
                title="Trending Products"
                value={analytics.trendingProducts}
                icon={Flame}
                color="indigo"
              />

              <AnalyticsCard
                title="Inventory Value"
                value={`₹${analytics.inventoryValue.toLocaleString()}`}
                icon={IndianRupee}
                color="emerald"
              />

            </div>

            {/* Bottom Section */}

            <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">

              {/* Categories */}

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                  <h2 className="text-xl font-bold text-gray-800">
                    Category Analytics
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Product distribution by category
                  </p>

                </div>

                <div className="p-6">

                  {analytics.categoryAnalytics.length === 0 ? (

                    <div className="py-12 text-center text-gray-500">
                      No Categories Found
                    </div>

                  ) : (

                    <div className="space-y-4">

                      {analytics.categoryAnalytics.map((item) => (

                        <div
                          key={item._id}
                          className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-green-300 hover:bg-green-50"
                        >

                          <div>

                            <h3 className="font-semibold text-gray-800">
                              {item._id}
                            </h3>

                            <p className="text-sm text-gray-500">
                              Product Category
                            </p>

                          </div>

                          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            {item.totalProducts}
                          </span>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              </div>

              {/* Recent Products */}

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">

                  <h2 className="text-xl font-bold text-gray-800">
                    Recently Added Products
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest inventory updates
                  </p>

                </div>

                <div className="p-6">

                  {analytics.recentProducts.length === 0 ? (

                    <div className="py-12 text-center text-gray-500">
                      No Products Found
                    </div>

                  ) : (

                    <div className="space-y-4">

                      {analytics.recentProducts.map((product) => (

                        <div
                          key={product._id}
                          className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-green-300 hover:bg-green-50 sm:flex-row sm:items-center"
                        >

                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-20 w-20 rounded-xl object-cover"
                          />

                          <div className="flex-1">

                            <h3 className="font-semibold text-gray-800">
                              {product.title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              {product.category}
                            </p>

                          </div>

                          <div className="text-lg font-bold text-green-600">
                            ₹{product.price}
                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default ProductAnalytics;