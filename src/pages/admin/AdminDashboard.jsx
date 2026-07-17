import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import DashboardStats from "../../components/admin/DashboardStats";

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <AdminNavbar />

        <main className="p-8">

          <DashboardStats />

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;