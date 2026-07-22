import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import {
  successToast,
  errorToast,
} from "../../utils/toast";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      await login(formData);

      // ✅ Success Toast
      successToast("Login Successful");

      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login Failed";

      setServerError(message);

      // ✅ Error Toast
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Login to your account
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Email */}
        <div>
          <label className="font-medium">
            Email
          </label>

          <div className="border rounded-lg flex items-center mt-2 px-3">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 outline-none"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-medium">
            Password
          </label>

          <div className="border rounded-lg flex items-center mt-2 px-3">
            <FaLock className="text-gray-400" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              className="w-full p-3 outline-none"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        {/* Remember & Forgot Password */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Register */}
      <p className="text-center mt-6">
        Don't have an account?

        <Link
          to="/register"
          className="text-green-600 ml-2 font-semibold"
        >
          Register
        </Link>
      </p>

    </div>
  );
};

export default LoginForm;