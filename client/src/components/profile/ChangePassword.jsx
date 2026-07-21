import { useState } from "react";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:5000/api/users/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaLock />
        Change Password
      </h2>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <div>
          <label className="font-medium block mb-2">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="font-medium block mb-2">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="font-medium block mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;