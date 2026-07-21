import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import DashboardStats from "../../components/admin/DashboardStats";
import RevenueAnalytics from "../../components/admin/RevenueAnalytics";
import SalesAnalytics from "../../components/admin/SalesAnalytics";
import InventoryAnalytics from "../../components/admin/InventoryAnalytics";
import SalesChart from "../../components/admin/SalesChart";
import OrderStatusChart from "../../components/admin/OrderStatusChart";
import TopSellingProducts from "../../components/admin/TopSellingProducts";
import RecentSalesTable from "../../components/admin/RecentSalesTable";
import CustomerAnalytics from "../../components/admin/CustomerAnalytics";
import OrderAnalytics from "../../components/admin/OrderAnalytics";
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Temporary Data
  // Backend API se replace karenge Phase 21.3 complete hone se pehle

  const salesChartData = [
    { month: "Jan", sales: 42000 },
    { month: "Feb", sales: 58000 },
    { month: "Mar", sales: 67000 },
    { month: "Apr", sales: 52000 },
    { month: "May", sales: 81000 },
    { month: "Jun", sales: 73000 },
    { month: "Jul", sales: 96000 },
    { month: "Aug", sales: 88000 },
    { month: "Sep", sales: 92000 },
    { month: "Oct", sales: 110000 },
    { month: "Nov", sales: 124000 },
    { month: "Dec", sales: 139000 },
  ];

  const orderStatus = {
    pending: 12,
    processing: 18,
    shipped: 22,
    delivered: 94,
    cancelled: 7,
  };

  const topProducts = [
    {
      _id: "1",
      name: "Wireless Headphones",
      category: "Electronics",
      image: "https://placehold.co/80x80",
      sold: 230,
      revenue: 575000,
      progress: 92,
    },
    {
      _id: "2",
      name: "Smart Watch",
      category: "Electronics",
      image: "https://placehold.co/80x80",
      sold: 180,
      revenue: 420000,
      progress: 78,
    },
    {
      _id: "3",
      name: "Gaming Mouse",
      category: "Accessories",
      image: "https://placehold.co/80x80",
      sold: 140,
      revenue: 245000,
      progress: 62,
    },
  ];

  const recentOrders = [
    {
      _id: "ORD001",
      total: 2499,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      createdAt: new Date(),
      user: {
        name: "Rahul Sharma",
      },
    },
    {
      _id: "ORD002",
      total: 3999,
      paymentStatus: "Pending",
      orderStatus: "Processing",
      createdAt: new Date(),
      user: {
        name: "Priya Singh",
      },
    },
  ];

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

            {/* Welcome */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Welcome Back 👋
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-500">
                Here's what's happening with your store today.
              </p>
            </div>

            {/* Dashboard */}
<div className="space-y-8">
  <DashboardStats />

  <RevenueAnalytics />

  <SalesAnalytics />

  <InventoryAnalytics />


  <CustomerAnalytics />

  <OrderAnalytics />

  <SalesChart
    data={salesChartData}
  />

  <OrderStatusChart
    data={orderStatus}
  />

  <TopSellingProducts
    products={topProducts}
  />

  <RecentSalesTable
    orders={recentOrders}
  />
</div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;