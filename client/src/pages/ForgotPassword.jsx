import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaArrowLeft,
  FaKey,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

import {
  successToast,
  errorToast,
} from "../utils/toast";

// ======================================================
// Forgot Password
// ======================================================

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    forgotPassword,
    verifyForgotOtp,
    resetUserPassword,
  } = useAuth();

  // ======================================================
  // States
  // ======================================================

  // 1 = Email
  // 2 = OTP
  // 3 = New Password
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [serverError, setServerError] =
    useState("");

  // ======================================================
  // Send Forgot Password OTP
  // ======================================================

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();

    // ===============================
    // Validation
    // ===============================

    if (!normalizedEmail) {
      const errorMessage =
        "Please enter your email";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail
      )
    ) {
      const errorMessage =
        "Please enter a valid email";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    try {
      setLoading(true);
      setServerError("");
      setMessage("");

      const data =
        await forgotPassword(
          normalizedEmail
        );

      console.log(
        "Forgot Password Response:",
        data
      );

      if (data?.otpRequired) {
        setEmail(
          data.email || normalizedEmail
        );

        setStep(2);

        successToast(
          "OTP sent to your email"
        );

        setMessage(
          "A 6-digit OTP has been sent to your email. It is valid for 10 minutes."
        );

        return;
      }

      const errorMessage =
        data?.message ||
        "Unable to send OTP";

      setServerError(errorMessage);
      errorToast(errorMessage);
    } catch (error) {
      console.error(
        "Forgot Password Error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        "Unable to send OTP. Please try again.";

      setServerError(errorMessage);
      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Verify Forgot Password OTP
  // ======================================================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setServerError("");
    setMessage("");

    // ===============================
    // OTP Validation
    // ===============================

    if (!otp) {
      const errorMessage =
        "Please enter OTP";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      const errorMessage =
        "OTP must be exactly 6 digits";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    try {
      setLoading(true);

      const data =
        await verifyForgotOtp(
          email,
          otp
        );

      console.log(
        "Forgot Password OTP Response:",
        data
      );

      if (data?.otpVerified) {
        setStep(3);

        successToast(
          "OTP verified successfully"
        );

        setMessage(
          "OTP verified. Now create your new password."
        );

        return;
      }

      const errorMessage =
        data?.message ||
        "OTP verification failed";

      setServerError(errorMessage);
      errorToast(errorMessage);
    } catch (error) {
      console.error(
        "Forgot Password OTP Error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        "Invalid or expired OTP";

      setServerError(errorMessage);
      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Reset Password
  // ======================================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setServerError("");
    setMessage("");

    // ===============================
    // Password Validation
    // ===============================

    if (!newPassword) {
      const errorMessage =
        "Please enter a new password";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    if (newPassword.length < 6) {
      const errorMessage =
        "Password must be at least 6 characters";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      const errorMessage =
        "Passwords do not match";

      setServerError(errorMessage);
      errorToast(errorMessage);

      return;
    }

    try {
      setLoading(true);

      const data =
        await resetUserPassword({
          email,
          otp,
          newPassword,
        });

      console.log(
        "Reset Password Response:",
        data
      );

      if (data?.success) {
        successToast(
          "Password reset successfully"
        );

        setMessage(
          "Your password has been reset successfully. Redirecting to login..."
        );

        // ===============================
        // Clear Sensitive State
        // ===============================

        setOtp("");
        setNewPassword("");
        setConfirmPassword("");

        // ===============================
        // Redirect to Login
        // ===============================

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      const errorMessage =
        data?.message ||
        "Password reset failed";

      setServerError(errorMessage);
      errorToast(errorMessage);
    } catch (error) {
      console.error(
        "Reset Password Error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        "Unable to reset password. Please try again.";

      setServerError(errorMessage);
      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Back
  // ======================================================

  const handleBack = () => {
    setServerError("");
    setMessage("");

    if (step === 2) {
      setStep(1);
      setOtp("");
      return;
    }

    if (step === 3) {
      setStep(2);
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
  };

  // ======================================================
  // Email Step
  // ======================================================

  if (step === 1) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          py-10
        "
        style={{
          backgroundColor:
            "var(--background-color, #f3f4f6)",
        }}
      >
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
          {/* Heading */}

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
              <FaEnvelope className="text-white text-2xl" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Forgot Password?
            </h1>

            <p className="text-gray-600 mt-2">
              Enter your email and we'll send you a
              verification OTP.
            </p>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSendOtp}
            className="space-y-5"
            autoComplete="off"
          >
            <div>
              <label className="font-medium text-gray-800">
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
                  value={email}
                  onChange={(e) => {
                    setEmail(
                      e.target.value
                    );

                    setServerError("");
                    setMessage("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="
                    w-full
                    p-3
                    outline-none
                    bg-transparent
                    text-gray-800
                    placeholder:text-gray-400
                  "
                />
              </div>
            </div>

            {/* Error */}

            {serverError && (
              <div
                className="
                  bg-red-100
                  text-red-600
                  border
                  border-red-200
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

            {/* Message */}

            {message && (
              <div
                className="
                  bg-green-50
                  text-green-700
                  border
                  border-green-200
                  p-3
                  text-sm
                "
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              >
                {message}
              </div>
            )}

            {/* Button */}

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
                : "Send OTP"}
            </button>
          </form>

          {/* Back To Login */}

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="
                inline-flex
                items-center
                gap-2
                font-semibold
                hover:underline
              "
              style={{
                color:
                  "var(--primary-color, #355E3B)",
              }}
            >
              <FaArrowLeft />

              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // OTP Step
  // ======================================================

  if (step === 2) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          py-10
        "
        style={{
          backgroundColor:
            "var(--background-color, #f3f4f6)",
        }}
      >
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
          {/* Heading */}

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

            <p className="font-semibold text-gray-800 mt-1 break-all">
              {email}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              OTP is valid for 10 minutes
            </p>
          </div>

          {/* OTP Form */}

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
                    setServerError("");
                    setMessage("");
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

            {/* Error */}

            {serverError && (
              <div
                className="
                  bg-red-100
                  text-red-600
                  border
                  border-red-200
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

            {/* Button */}

            <button
              type="submit"
              disabled={
                loading ||
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
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

            {/* Back */}

            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
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
              ← Back to Email
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ======================================================
  // New Password Step
  // ======================================================

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-10
      "
      style={{
        backgroundColor:
          "var(--background-color, #f3f4f6)",
      }}
    >
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
        {/* Heading */}

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
            <FaLock className="text-white text-2xl" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create New Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter a new password for your account.
          </p>
        </div>

        {/* Reset Password Form */}

        <form
          onSubmit={handleResetPassword}
          className="space-y-5"
          autoComplete="off"
        >
          {/* New Password */}

          <div>
            <label className="font-medium text-gray-700">
              New Password
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
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(
                    e.target.value
                  );

                  setServerError("");
                }}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="
                  w-full
                  p-3
                  outline-none
                  bg-transparent
                  text-gray-800
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                className="p-2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-medium text-gray-700">
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
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(
                    e.target.value
                  );

                  setServerError("");
                }}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="
                  w-full
                  p-3
                  outline-none
                  bg-transparent
                  text-gray-800
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="p-2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Error */}

          {serverError && (
            <div
              className="
                bg-red-100
                text-red-600
                border
                border-red-200
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

          {/* Message */}

          {message && (
            <div
              className="
                bg-green-50
                text-green-700
                border
                border-green-200
                p-3
                text-sm
              "
              style={{
                borderRadius:
                  "var(--border-radius, 8px)",
              }}
            >
              {message}
            </div>
          )}

          {/* Reset Button */}

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
              ? "Resetting Password..."
              : "Reset Password"}
          </button>

          {/* Back */}

          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
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
            ← Back to OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;