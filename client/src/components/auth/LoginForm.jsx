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

// ==========================================
// Validation Schema
// ==========================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // React Hook Form
  // ==========================================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // ==========================================
  // Login
  // ==========================================

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      await login(formData);

      successToast("Login Successful");

      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login Failed";

      setServerError(message);

      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-white
        shadow-xl
        p-6
        sm:p-8
        w-full
        max-w-md
      "
      style={{
        borderRadius:
          "var(--border-radius, 16px)",
      }}
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Login to your account
        </p>
      </div>

      {/* ====================================== */}
      {/* Form */}
      {/* ====================================== */}

<form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-5"
  autoComplete="off"
>
        {/* Email */}

        <div>
<label className="font-medium text-gray-700">
  Email
</label>

          <div
            className="
              border
              border-gray-300
              flex
              items-center
              mt-2
              px-3
              transition
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor =
                "var(--primary-color, #355E3B)";
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor =
                "#d1d5db";
            }}
          >
            <FaEnvelope className="text-gray-400 shrink-0" />

<input
  type="email"
  placeholder="Enter email"
  autoComplete="off"
  className="
    w-full
    p-3
    outline-none
    bg-transparent

    text-gray-800
    placeholder:text-gray-400
  "
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
<label className="font-medium text-gray-700">
  Password
</label>
          <div
            className="
              border
              border-gray-300
              flex
              items-center
              mt-2
              px-3
              transition
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor =
                "var(--primary-color, #355E3B)";
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor =
                "#d1d5db";
            }}
          >
            <FaLock className="text-gray-400 shrink-0" />
<input
  type={showPassword ? "text" : "password"}
  placeholder="Enter password"
  autoComplete="new-password"
  className="
    w-full
    p-3
    outline-none
    bg-transparent

    text-gray-800
    placeholder:text-gray-400
  "
  {...register("password")}
/>
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
              className="
                p-2
                text-gray-500
                transition
                hover:opacity-70
              "
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

        {/* ====================================== */}
        {/* Server Error */}
        {/* ====================================== */}

        {serverError && (
          <div
            className="
              bg-red-100
              text-red-600
              p-3
              text-sm
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
          >
            {serverError}
          </div>
        )}

        {/* ====================================== */}
        {/* Remember / Forgot */}
        {/* ====================================== */}

        <div
          className="
            flex
            justify-between
            items-center
            gap-3
            text-sm
          "
        >
          <label className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input
              type="checkbox"
              className="
                w-4
                h-4
                accent-[var(--primary-color)]
              "
            />

            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="
              font-medium
              hover:underline
            "
            style={{
              color:
                "var(--primary-color, #355E3B)",
            }}
          >
            Forgot Password?
          </Link>
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
            font-semibold
            transition
            duration-300
            hover:opacity-90
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          style={{
            backgroundColor:
              "var(--primary-color, #355E3B)",

            borderRadius:
              "var(--border-radius, 8px)",
          }}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      {/* ====================================== */}
      {/* Register */}
      {/* ====================================== */}

     <p className="text-center mt-6 text-gray-600">
        Don't have an account?

        <Link
          to="/register"
          className="
            ml-2
            font-semibold
            hover:underline
          "
          style={{
            color:
              "var(--primary-color, #355E3B)",
          }}
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;