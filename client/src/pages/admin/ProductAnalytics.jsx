import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

// ==========================================
// Query Key
// ==========================================

export const PRODUCT_ANALYTICS_QUERY_KEY = [
  "product-analytics",
];

// ==========================================
// Inventory Value Formatter
// ==========================================

const formatInventoryValue = (amount = 0) => {
  const value = Number(amount) || 0;

  // Crore
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  // Lakh
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  // Thousand
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(2)} K`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

// ==========================================
// Product Analytics
// ==========================================

const ProductAnalytics = () => {
  // ========================================
  // Sidebar
  // ========================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // ========================================
  // React Query
  // ========================================

  const {
    data: analytics,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    // ======================================
    // Same key = same cached data
    // ======================================

    queryKey: PRODUCT_ANALYTICS_QUERY_KEY,

    // ======================================
    // API
    // ======================================

    queryFn: getProductAnalytics,

    // ======================================
    // Keep analytics fresh for 5 minutes
    // ======================================

    staleTime: 5 * 60 * 1000,

    // ======================================
    // Keep unused cache for 30 minutes
    // ======================================

    gcTime: 30 * 60 * 1000,

    // ======================================
    // Don't refetch unnecessarily
    // ======================================

    refetchOnWindowFocus: false,

    refetchOnReconnect: false,

    refetchOnMount: false,

    // ======================================
    // Retry once
    // ======================================

    retry: 1,
  });

  // ==========================================
  // Debug
  // ==========================================

  if (import.meta.env.DEV && isFetching) {
    console.log(
      "📊 Product Analytics API fetching..."
    );
  }

  // ==========================================
  // Loading
  // ==========================================

  if (isLoading) {
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
                <div
                  className="
                    mx-auto
                    mb-5
                    h-12
                    w-12
                    animate-spin
                    rounded-full
                    border-4
                    border-green-600
                    border-t-transparent
                  "
                />

                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  Loading Analytics...
                </h2>

                <p className="mt-2 text-center text-gray-500">
                  Please wait while we fetch product
                  analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (isError) {
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
              <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                <AlertTriangle
                  size={45}
                  className="mx-auto text-red-500"
                />

                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  Unable to Load Analytics
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {error?.response?.data?.message ||
                    error?.message ||
                    "Failed to load product analytics."}
                </p>

                <button
                  onClick={() => refetch()}
                  className="
                    mt-6
                    rounded-xl
                    bg-green-600
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                  "
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Safe Analytics Data
  // ==========================================

  const data = {
    totalProducts:
      analytics?.totalProducts ?? 0,

    activeProducts:
      analytics?.activeProducts ?? 0,

    draftProducts:
      analytics?.draftProducts ?? 0,

    lowStockProducts:
      analytics?.lowStockProducts ?? 0,

    outOfStockProducts:
      analytics?.outOfStockProducts ?? 0,

    featuredProducts:
      analytics?.featuredProducts ?? 0,

    trendingProducts:
      analytics?.trendingProducts ?? 0,

    inventoryValue:
      analytics?.inventoryValue ?? 0,

    categoryAnalytics:
      analytics?.categoryAnalytics ?? [],

    recentProducts:
      analytics?.recentProducts ?? [],
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">

        {/* ======================================
            Sidebar
        ====================================== */}

        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* ======================================
            Main Content
        ====================================== */}

        <div className="flex-1 min-w-0 flex flex-col">

          {/* Navbar */}

          <AdminNavbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* ======================================
              Page Content
          ====================================== */}

          <main className="flex-1 p-4 sm:p-6 lg:p-8">

            {/* ======================================
                Header
            ====================================== */}

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  Product Analytics
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Track inventory, product performance
                  and stock insights.
                </p>
              </div>

              {/* Optional Refresh */}

              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-gray-700
                  shadow-sm
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isFetching
                  ? "Refreshing..."
                  : "Refresh Analytics"}
              </button>
            </div>

            {/* ======================================
                Analytics Cards
            ====================================== */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <AnalyticsCard
                title="Total Products"
                value={data.totalProducts}
                icon={Package}
                color="green"
              />

              <AnalyticsCard
                title="Active Products"
                value={data.activeProducts}
                icon={Boxes}
                color="blue"
              />

              <AnalyticsCard
                title="Draft Products"
                value={data.draftProducts}
                icon={XCircle}
                color="yellow"
              />

              <AnalyticsCard
                title="Low Stock"
                value={data.lowStockProducts}
                icon={AlertTriangle}
                color="red"
              />

              <AnalyticsCard
                title="Out Of Stock"
                value={data.outOfStockProducts}
                icon={XCircle}
                color="rose"
              />

              <AnalyticsCard
                title="Featured Products"
                value={data.featuredProducts}
                icon={Star}
                color="purple"
              />

              <AnalyticsCard
                title="Trending Products"
                value={data.trendingProducts}
                icon={Flame}
                color="indigo"
              />

              <AnalyticsCard
                title="Inventory Value"
                value={formatInventoryValue(
                  data.inventoryValue
                )}
                icon={IndianRupee}
                color="emerald"
              />
            </div>

            {/* ======================================
                Bottom Section
            ====================================== */}

            <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">

              {/* ====================================
                  Category Analytics
              ==================================== */}

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Category Analytics
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Product distribution by category
                  </p>
                </div>

                <div className="p-4 sm:p-6">

                  {data.categoryAnalytics.length ===
                  0 ? (
                    <div className="py-12 text-center text-gray-500">
                      No Categories Found
                    </div>
                  ) : (
                    <div className="space-y-4">

                      {data.categoryAnalytics.map(
                        (item, index) => (
                          <div
                            key={
                              item._id ||
                              `category-${index}`
                            }
                            className="
                              flex
                              items-center
                              justify-between
                              gap-4
                              rounded-xl
                              border
                              border-gray-100
                              bg-gray-50
                              px-4
                              py-4
                              transition
                              hover:border-green-300
                              hover:bg-green-50
                            "
                          >
<div className="min-w-0">
  <h3 className="truncate font-semibold text-gray-800">
    {item.categoryName ||
      "Uncategorized"}
  </h3>

  <p className="text-sm text-gray-500">
    Product Category
  </p>
</div>

                            <span className="flex-shrink-0 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                              {item.totalProducts ??
                                0}
                            </span>
                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>
              </div>

              {/* ====================================
                  Recently Added Products
              ==================================== */}

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Recently Added Products
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest inventory updates
                  </p>
                </div>

                <div className="p-4 sm:p-6">

                  {data.recentProducts.length ===
                  0 ? (
                    <div className="py-12 text-center text-gray-500">
                      No Products Found
                    </div>
                  ) : (
                    <div className="space-y-4">

                      {data.recentProducts.map(
                        (product) => (
                          <div
                            key={product._id}
                            className="
                              flex
                              flex-col
                              gap-4
                              rounded-xl
                              border
                              border-gray-100
                              p-4
                              transition
                              hover:border-green-300
                              hover:bg-green-50
                              sm:flex-row
                              sm:items-center
                            "
                          >

                            {/* Product Image */}

                            {product.thumbnail ? (
                              <img
                                src={product.thumbnail}
                                alt={
                                  product.title ||
                                  "Product"
                                }
                                className="
                                  h-20
                                  w-20
                                  flex-shrink-0
                                  rounded-xl
                                  object-cover
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  h-20
                                  w-20
                                  flex-shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-gray-100
                                "
                              >
                                <Package
                                  size={28}
                                  className="text-gray-400"
                                />
                              </div>
                            )}

                            {/* Product Details */}

                            <div className="min-w-0 flex-1">

                              <h3 className="truncate font-semibold text-gray-800">
                                {product.title ||
                                  "Unnamed Product"}
                              </h3>

<p className="mt-1 truncate text-sm text-gray-500">
  {product.category?.name ||
    "Uncategorized"}
</p>

                            </div>

                            {/* Price */}

                            <div className="flex-shrink-0 text-lg font-bold text-green-600">
                              ₹
                              {Number(
                                product.price || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </div>

                          </div>
                        )
                      )}

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