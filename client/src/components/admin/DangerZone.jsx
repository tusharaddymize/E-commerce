
import { useState } from "react";
import {
  AlertTriangle,
  Trash2,
  LogOut,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAdmin } from "../../context/AdminContext";

const DangerZone = () => {
  const { logout } = useAdmin();

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleLogoutAll = async () => {
    const confirm = window.confirm(
      "Are you sure you want to logout from all devices?"
    );

    if (!confirm) return;

    try {
      setLoadingLogout(true);

      // Backend API call
      // await logoutAllDevices();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Logged out from all devices.");

      logout();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoadingLogout(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "This action is irreversible.\n\nDo you really want to delete your admin account?"
    );

    if (!confirm) return;

    try {
      setLoadingDelete(true);

      // Backend API call
      // await deleteAdminAccount();

      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success("Account deleted successfully.");

      logout();
    } catch (error) {
      toast.error("Failed to delete account.");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-red-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle
          size={26}
          className="text-red-600"
        />

        <div>
          <h2 className="text-xl font-bold text-red-600">
            Danger Zone
          </h2>

          <p className="text-gray-500 text-sm">
            These actions are permanent and cannot be undone.
          </p>
        </div>
      </div>

      {/* Logout All Devices */}
      <div className="border rounded-xl p-5 mb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">
              Logout from All Devices
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Sign out your admin account from every logged-in
              device.
            </p>
          </div>

          <button
            onClick={handleLogoutAll}
            disabled={loadingLogout}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg transition disabled:opacity-60"
          >
            {loadingLogout ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Processing...
              </>
            ) : (
              <>
                <LogOut size={18} />
                Logout All
              </>
            )}
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="border border-red-200 rounded-xl p-5 bg-red-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg text-red-700">
              Delete Admin Account
            </h3>

            <p className="text-red-600 text-sm mt-1">
              Permanently remove your admin account and all
              associated data.
            </p>
          </div>

          <button
            onClick={handleDeleteAccount}
            disabled={loadingDelete}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition disabled:opacity-60"
          >
            {loadingDelete ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete Account
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;