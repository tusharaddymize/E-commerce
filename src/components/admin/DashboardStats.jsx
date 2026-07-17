import DashboardCard from "./DashboardCard";

const DashboardStats = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6">

      <DashboardCard title="Products" value="0" />

      <DashboardCard title="Orders" value="0" />

      <DashboardCard title="Users" value="0" />

      <DashboardCard title="Revenue" value="₹0" />

    </div>
  );
};

export default DashboardStats;