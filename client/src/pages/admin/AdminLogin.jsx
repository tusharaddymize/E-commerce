import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useAdmin } from "../../context/AdminContext";
import API from "../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAdmin();

  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // Loading State
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Show / Hide Password
  // ==========================================

  const [showPassword, setShowPassword] =
    useState(false);

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // Admin Login
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple requests
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await API.post(
        "/admin/login",
        formData
      );

      // Save admin authentication
login(data);

const token =
  data.token ||
  data.adminToken ||
  data.accessToken ||
  data.data?.token ||
  data.data?.adminToken ||
  data.data?.accessToken;

if (!token) {
  toast.error("Admin token not received from server");
  return;
}

toast.success(
  "Admin Login Successful"
);

const redirect =
  location.state?.from?.pathname ||
  "/admin/dashboard";

navigate(redirect, {
  replace: true,
});
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Admin Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        w-full

        flex
        items-center
        justify-center

        bg-gray-100

        px-4
        py-8
      "
    >
      {/* ====================================== */}
      {/* Admin Login Card */}
      {/* ====================================== */}

      <div
        className="
          bg-white

          shadow-xl

          rounded-xl

          p-6
          sm:p-8

          w-full
          max-w-md
        "
      >
        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <h1
          className="
            text-3xl
            font-bold

            text-center

            mb-2

            text-gray-800
          "
        >
          Admin Login
        </h1>

        <p
          className="
            text-center

            text-gray-500

            mb-6
          "
        >
          Login to Admin Dashboard
        </p>

        {/* ====================================== */}
        {/* Form */}
        {/* ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* ==================================== */}
          {/* Email */}
          {/* ==================================== */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                font-medium

                text-gray-700
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              className="
                w-full

                border
                border-gray-300

                rounded-lg

                px-4
                py-3

                outline-none

                bg-white

                text-gray-800

                placeholder:text-gray-400

                focus:ring-2
                focus:ring-[var(--primary-color,#355E3B)]
                focus:border-[var(--primary-color,#355E3B)]

                transition
              "
            />
          </div>

          {/* ==================================== */}
          {/* Password */}
          {/* ==================================== */}

          <div>
            <label
              className="
                block
                mb-2

                text-sm
                font-medium

                text-gray-700
              "
            >
              Password
            </label>

            {/* Password Wrapper */}

            <div
              className="
                relative
                w-full
              "
            >
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="
                  w-full

                  border
                  border-gray-300

                  rounded-lg

                  px-4
                  py-3
                  pr-12

                  outline-none

                  bg-white

                  text-gray-800

                  placeholder:text-gray-400

                  focus:ring-2
                  focus:ring-[var(--primary-color,#355E3B)]
                  focus:border-[var(--primary-color,#355E3B)]

                  transition
                "
              />

              {/* ================================= */}
              {/* Show / Hide Password */}
              {/* ================================= */}

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="
                  absolute

                  right-4
                  top-1/2

                  -translate-y-1/2

                  flex
                  items-center
                  justify-center

                  p-1

                  text-gray-500

                  hover:text-gray-800

                  transition

                  cursor-pointer
                "
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* ====================================== */}
          {/* Login Button */}
          {/* ====================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full

              text-white

              py-3

              rounded-lg

              font-semibold

              hover:opacity-90

              transition

              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            style={{
              backgroundColor:
                "var(--primary-color,#355E3B)",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;