import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}

      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* ===================================== */}
      {/* ALL ADMIN PAGE CONTENT */}
      {/* ===================================== */}

      <div
        className="
          min-h-screen
          w-full

          lg:ml-72
          lg:w-[calc(100%-18rem)]

          transition-all
          duration-300
        "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;