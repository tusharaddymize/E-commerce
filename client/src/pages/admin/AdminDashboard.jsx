import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import DashboardStats from "../../components/admin/DashboardStats";
import RevenueAnalytics from "../../components/admin/RevenueAnalytics";
import SalesAnalytics from "../../components/admin/SalesAnalytics";
import InventoryAnalytics from "../../components/admin/InventoryAnalytics";
import CustomerAnalytics from "../../components/admin/CustomerAnalytics";
import OrderAnalytics from "../../components/admin/OrderAnalytics";

const AdminDashboard = () => {
  // ==========================================
  // Sidebar State
  // ==========================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        {/* ====================================== */}
        {/* SIDEBAR */}
        {/* ====================================== */}

        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* ====================================== */}
        {/* MAIN CONTENT */}
        {/* ====================================== */}

        <div
          className="
            flex-1
            min-w-0
            flex
            flex-col
          "
        >
          {/* ==================================== */}
          {/* NAVBAR */}
          {/* ==================================== */}

          <AdminNavbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* ==================================== */}
          {/* DASHBOARD CONTENT */}
          {/* ==================================== */}

          <main
            className="
              flex-1

              w-full
              min-w-0

              px-3
              py-4

              sm:px-5
              sm:py-6

              lg:px-6
              lg:py-7

              xl:px-8

              overflow-x-hidden
            "
          >
            {/* ================================ */}
            {/* WELCOME */}
            {/* ================================ */}

            <div
              className="
                mb-5
                sm:mb-7
              "
            >
              <h1
                className="
                  text-xl
                  sm:text-2xl
                  lg:text-3xl

                  font-bold

                  text-slate-800
                "
              >
                Welcome Back 👋
              </h1>

              <p
                className="
                  mt-1
                  sm:mt-2

                  text-xs
                  sm:text-sm
                  lg:text-base

                  text-slate-500
                "
              >
                Here's what's happening with your
                store today.
              </p>
            </div>

            {/* ================================ */}
            {/* DASHBOARD ANALYTICS */}
            {/* ================================ */}

            <div
              className="
                w-full
                min-w-0

                space-y-6
                sm:space-y-8
              "
            >
              <DashboardStats />

              <RevenueAnalytics />

              <SalesAnalytics />

              <InventoryAnalytics />

              <CustomerAnalytics />

              <OrderAnalytics />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;