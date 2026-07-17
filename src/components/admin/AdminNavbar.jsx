import { Bell, UserCircle } from "lucide-react";

const AdminNavbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <Bell size={22} />

        <UserCircle size={34} />

      </div>

    </header>
  );
};

export default AdminNavbar;