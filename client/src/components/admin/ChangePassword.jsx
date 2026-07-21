import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { changeAdminPassword } from "../../services/adminService";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (form.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await changeAdminPassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Lock size={20} />
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Current Password */}
        <div>
          <label className="block mb-2 font-medium">
            Current Password
          </label>

          <div className="relative">
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter current password"
            />

            <button
              type="button"
              onClick={() =>
                setShow({
                  ...show,
                  current: !show.current,
                })
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {show.current ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>

          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter new password"
            />

            <button
              type="button"
              onClick={() =>
                setShow({
                  ...show,
                  new: !show.new,
                })
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {show.new ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Confirm password"
            />

            <button
              type="button"
              onClick={() =>
                setShow({
                  ...show,
                  confirm: !show.confirm,
                })
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {show.confirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
        >
          {loading && (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;