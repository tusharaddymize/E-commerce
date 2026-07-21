import {
  User,
  Lock,
  Bell,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SettingsProfile from "../../components/admin/SettingsProfile";
import ChangePassword from "../../components/admin/ChangePassword";
import NotificationSettings from "../../components/admin/NotificationSettings";
import DangerZone from "../../components/admin/DangerZone";

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-emerald-600 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Account Settings
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your profile, password and account preferences.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-emerald-100">
                <User
                  className="text-emerald-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Profile Information
                </h2>

                <p className="text-sm text-slate-500">
                  Update your personal details.
                </p>
              </div>
            </div>

            <SettingsProfile />
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-100">
                <Lock
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Change Password
                </h2>

                <p className="text-sm text-slate-500">
                  Keep your account secure.
                </p>
              </div>
            </div>

            <ChangePassword />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-yellow-100">
                <Bell
                  className="text-yellow-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Notifications
                </h2>

                <p className="text-sm text-slate-500">
                  Manage notification preferences.
                </p>
              </div>
            </div>

            <NotificationSettings />
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-100">
                <ShieldAlert
                  className="text-red-600"
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-red-600">
                  Danger Zone
                </h2>

                <p className="text-sm text-slate-500">
                  Permanent account actions.
                </p>
              </div>
            </div>

            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;