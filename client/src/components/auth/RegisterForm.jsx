import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FaUser,
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
// Validation Schema
// ==========================================

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

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

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

// ==========================================
// Register Form
// ==========================================

const RegisterForm = () => {
  const navigate = useNavigate();

  // ==========================================
  // Auth Context
  // ==========================================

  const {
    register: registerUser,
    verifyRegisterOtp,
  } = useAuth();

  // ==========================================
  // States
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  const [otpLoading, setOtpLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  // ==========================================
  // OTP States
  // ==========================================

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [registerEmail, setRegisterEmail] =
    useState("");

  // ==========================================
  // React Hook Form
  // ==========================================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ==========================================
  // Register User
  // ==========================================

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email
          .trim()
          .toLowerCase(),
        password: formData.password,
      };

      console.log(
        "Sending registration request:",
        payload
      );

      const data =
        await registerUser(payload);

      console.log(
        "REGISTER RESPONSE:",
        data
      );

      // ======================================
      // OTP REQUIRED
      // ======================================

      if (data?.otpRequired === true) {
        setRegisterEmail(
          data.email || payload.email
        );

        setOtpSent(true);

        successToast(
          "OTP sent to your email"
        );

        return;
      }

      // ======================================
      // OTP NOT SENT
      // ======================================

      setServerError(
        data?.message ||
          "OTP verification is required before registration."
      );

      errorToast(
        data?.message ||
          "OTP was not sent"
      );

    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Registration Failed";

      setServerError(message);

      errorToast(message);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Verify Registration OTP
  // ==========================================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setServerError("");

    // ========================================
    // OTP Validation
    // ========================================

    if (!otp) {
      errorToast("Please enter OTP");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      errorToast(
        "OTP must be 6 digits"
      );
      return;
    }

    if (!registerEmail) {
      errorToast(
        "Registration email is missing"
      );
      return;
    }

    try {
      setOtpLoading(true);

      console.log(
        "Verifying registration OTP:",
        {
          email: registerEmail,
          otp,
        }
      );

      const data =
        await verifyRegisterOtp(
          registerEmail,
          otp
        );

      console.log(
        "REGISTRATION OTP RESPONSE:",
        data
      );

      // ======================================
      // OTP SUCCESS
      // ======================================

      if (
        data?.token &&
        data?.user
      ) {
        successToast(
          "Registration Successful"
        );

        // Dashboard/Home only after OTP
        navigate("/");
      } else {
        setServerError(
          "OTP verification failed"
        );

        errorToast(
          "OTP verification failed"
        );
      }

    } catch (error) {
      console.error(
        "Registration OTP Error:",
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
  // Back To Registration
  // ==========================================

  const handleBackToRegister = () => {
    setOtpSent(false);
    setOtp("");
    setRegisterEmail("");
    setServerError("");
  };

  // ==========================================
  // Input Focus
  // ==========================================

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor =
      "var(--primary-color, #355E3B)";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor =
      "#d1d5db";
  };

  // ==========================================
  // OTP SCREEN
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
        {/* ====================================== */}
        {/* OTP Heading */}
        {/* ====================================== */}

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
            <FaKey
              className="
                text-white
                text-2xl
              "
            />
          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            Verify OTP
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
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
            {registerEmail}
          </p>
        </div>

        {/* ====================================== */}
        {/* OTP Form */}
        {/* ====================================== */}

        <form
          onSubmit={handleVerifyOtp}
          className="space-y-5"
        >
          {/* OTP Input */}

          <div>
            <label
              className="
                font-medium
                text-gray-700
              "
            >
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
                transition
              "
              style={{
                borderRadius:
                  "var(--border-radius, 8px)",
              }}
              onFocusCapture={handleFocus}
              onBlurCapture={handleBlur}
            >
              <FaKey
                className="
                  text-gray-400
                  shrink-0
                "
              />

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setOtp(value);
                  setServerError("");
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

          {/* ==================================== */}
          {/* Server Error */}
          {/* ==================================== */}

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

          {/* ==================================== */}
          {/* Verify Button */}
          {/* ==================================== */}

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

          {/* ==================================== */}
          {/* Back Button */}
          {/* ==================================== */}

          <button
            type="button"
            onClick={
              handleBackToRegister
            }
            className="
              w-full
              text-sm
              font-medium
              hover:underline
            "
            style={{
              color:
                "var(--primary-color, #355E3B)",
            }}
          >
            ← Back to Registration
          </button>
        </form>
      </div>
    );
  }

  // ==========================================
  // NORMAL REGISTRATION SCREEN
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
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="text-center mb-8">
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          Create Account
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Join our store today
        </p>
      </div>

      {/* ====================================== */}
      {/* Registration Form */}
      {/* ====================================== */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        autoComplete="off"
      >
        {/* ==================================== */}
        {/* Name */}
        {/* ==================================== */}

        <div>
          <label
            className="
              font-medium
              text-gray-800
            "
          >
            Full Name
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
            onFocusCapture={handleFocus}
            onBlurCapture={handleBlur}
          >
            <FaUser
              className="
                text-gray-400
                shrink-0
              "
            />

            <input
              type="text"
              placeholder="Enter full name"
              autoComplete="name"
              className="
                w-full
                p-3
                outline-none
                bg-transparent
                text-gray-800
                placeholder:text-gray-400
              "
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p
              className="
                text-red-500
                text-sm
                mt-1
              "
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* ==================================== */}
        {/* Email */}
        {/* ==================================== */}

        <div>
          <label
            className="
              font-medium
              text-gray-800
            "
          >
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
            onFocusCapture={handleFocus}
            onBlurCapture={handleBlur}
          >
            <FaEnvelope
              className="
                text-gray-400
                shrink-0
              "
            />

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
            <p
              className="
                text-red-500
                text-sm
                mt-1
              "
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ==================================== */}
        {/* Password */}
        {/* ==================================== */}

        <div>
          <label
            className="
              font-medium
              text-gray-800
            "
          >
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
            onFocusCapture={handleFocus}
            onBlurCapture={handleBlur}
          >
            <FaLock
              className="
                text-gray-400
                shrink-0
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
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
            <p
              className="
                text-red-500
                text-sm
                mt-1
              "
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ==================================== */}
        {/* Confirm Password */}
        {/* ==================================== */}

        <div>
          <label
            className="
              font-medium
              text-gray-800
            "
          >
            Confirm Password
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
            onFocusCapture={handleFocus}
            onBlurCapture={handleBlur}
          >
            <FaLock
              className="
                text-gray-400
                shrink-0
              "
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              autoComplete="new-password"
              className="
                w-full
                p-3
                outline-none
                bg-transparent
                text-gray-800
                placeholder:text-gray-400
              "
              {...register(
                "confirmPassword"
              )}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
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
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p
              className="
                text-red-500
                text-sm
                mt-1
              "
            >
              {
                errors.confirmPassword
                  .message
              }
            </p>
          )}
        </div>

        {/* ==================================== */}
        {/* Server Error */}
        {/* ==================================== */}

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

        {/* ==================================== */}
        {/* Register Button */}
        {/* ==================================== */}

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
            : "Register"}
        </button>
      </form>

      {/* ====================================== */}
      {/* Login Link */}
      {/* ====================================== */}

      <p
        className="
          text-center
          mt-6
          text-gray-700
        "
      >
        Already have an account?

        <Link
          to="/login"
          className="
            font-semibold
            ml-2
            hover:underline
          "
          style={{
            color:
              "var(--primary-color, #355E3B)",
          }}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;