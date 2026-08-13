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
  FaKey,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

import {
  successToast,
  errorToast,
} from "../../utils/toast";

// ==========================================
// Login Validation
// ==========================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

// ==========================================
// Login Form
// ==========================================

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    login,
    verifyOtp,
  } = useAuth();

  // ==========================================
  // States
  // ==========================================

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [otpLoading, setOtpLoading] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [loginEmail, setLoginEmail] =
    useState("");

  // ==========================================
  // React Hook Form
  // ==========================================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ==========================================
  // Login
  // ==========================================

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      const data = await login(formData);

      console.log(
        "Login Response:",
        data
      );

      // ======================================
      // OTP Required
      // ======================================

      if (data?.otpRequired) {
        const email =
          data.email ||
          formData.email;

        setLoginEmail(email);
        setOtp("");
        setOtpSent(true);

        successToast(
          "OTP sent to your email"
        );

        return;
      }

      // ======================================
      // Unexpected Direct Login
      // ======================================

      if (
        data?.user &&
        data?.token
      ) {
        successToast(
          "Login Successful"
        );

        navigate("/");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Login failed. Please try again.";

      setServerError(message);

      errorToast(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Verify Login OTP
  // ==========================================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setServerError("");

    // ======================================
    // OTP Validation
    // ======================================

    if (!otp) {
      const message =
        "Please enter OTP";

      setServerError(message);
      errorToast(message);

      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      const message =
        "OTP must be exactly 6 digits";

      setServerError(message);
      errorToast(message);

      return;
    }

    try {
      setOtpLoading(true);

      const data = await verifyOtp(
        loginEmail,
        otp
      );

      console.log(
        "OTP Verification Response:",
        data
      );

      // ======================================
      // Successful Login
      // ======================================

      if (
        data?.token &&
        data?.user
      ) {
        successToast(
          "Login Successful"
        );

        navigate("/");
        return;
      }

      // ======================================
      // Unexpected Response
      // ======================================

      const message =
        "OTP verification failed";

      setServerError(message);
      errorToast(message);
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Invalid or expired OTP";

      setServerError(message);

      errorToast(message);
    } finally {
      setOtpLoading(false);
    }
  };

  // ==========================================
  // Back To Login
  // ==========================================

  const handleBackToLogin = () => {
    setOtpSent(false);
    setOtp("");
    setLoginEmail("");
    setServerError("");
  };

  // ==========================================
  // OTP Screen
  // ==========================================

  if (otpSent) {
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
        {/* ======================================
            OTP Heading
        ====================================== */}

        <div className="text-center mb-8">
          <div
            className="
              mx-auto
              w-16
              h-16
              rounded-full
              flex
              items-center
              justify-center
              mb-4
            "
            style={{
              backgroundColor:
                "var(--primary-color, #355E3B)",
            }}
          >
            <FaKey className="text-white text-2xl" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Verify OTP
          </h1>

          <p className="text-gray-500 mt-2">
            We sent a 6-digit OTP to
          </p>

          <p
            className="
              font-semibold
              text-gray-800
              mt-1
              break-all
            "
          >
            {loginEmail}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            OTP is valid for 10 minutes
          </p>
        </div>

        {/* ======================================
            OTP Form
        ====================================== */}

        <form
          onSubmit={handleVerifyOtp}
          className="space-y-5"
        >
          <div>
            <label className="font-medium text-gray-700">
              Enter OTP
            </label>

            <div
              className="
                border
                border-gray-300
                flex
                items-center
                mt-2
                px-3
                focus-within:border-green-700
              "
              style={{
                borderRadius:
                  "var(--border-radius, 8px)",
              }}
            >
              <FaKey className="text-gray-400 shrink-0" />

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                  setOtp(value);

                  if (serverError) {
                    setServerError("");
                  }
                }}
                className="
                  w-full
                  p-3
                  outline-none
                  bg-transparent
                  text-gray-800
                  text-center
                  tracking-[0.5em]
                  font-semibold
                "
                autoFocus
              />
            </div>
          </div>

          {/* ======================================
              Server Error
          ====================================== */}

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

          {/* ======================================
              Verify Button
          ====================================== */}

          <button
            type="submit"
            disabled={
              otpLoading ||
              otp.length !== 6
            }
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
            {otpLoading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

          {/* ======================================
              Back Button
          ====================================== */}

          <button
            type="button"
            onClick={handleBackToLogin}
            disabled={otpLoading}
            className="
              w-full
              text-sm
              font-medium
              hover:underline
              disabled:opacity-50
            "
            style={{
              color:
                "var(--primary-color, #355E3B)",
            }}
          >
            ← Back to Login
          </button>
        </form>
      </div>
    );
  }

  // ==========================================
  // Normal Login Screen
  // ==========================================

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
      {/* ======================================
          Heading
      ====================================== */}

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Login to your account
        </p>
      </div>

      {/* ======================================
          Login Form
      ====================================== */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        autoComplete="off"
      >
        {/* ====================================
            Email
        ==================================== */}

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
              focus-within:border-green-700
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
          >
            <FaEnvelope className="text-gray-400 shrink-0" />

            <input
              type="email"
              placeholder="Enter email"
              autoComplete="email"
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

        {/* ====================================
            Password
        ==================================== */}

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
              focus-within:border-green-700
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
          >
            <FaLock className="text-gray-400 shrink-0" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              autoComplete="current-password"
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
                hover:opacity-70
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
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

        {/* ====================================
            Server Error
        ==================================== */}

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

        {/* ====================================
            Remember / Forgot
        ==================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:justify-between
            sm:items-center
            gap-3
            text-sm
          "
        >
          <label
            className="
              flex
              items-center
              gap-2
              cursor-pointer
              text-gray-700
            "
          >
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
            className="font-medium hover:underline"
            style={{
              color:
                "var(--primary-color, #355E3B)",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* ====================================
            Login Button
        ==================================== */}

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
            ? "Sending OTP..."
            : "Login"}
        </button>
      </form>

      {/* ======================================
          Register
      ====================================== */}

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