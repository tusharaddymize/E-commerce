import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

import {
  successToast,
  errorToast,
} from "../utils/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      errorToast("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Backend API baad me connect karenge
      console.log("Forgot password email:", email);

      setMessage(
        "If an account exists with this email, a password reset link will be sent."
      );

      successToast("Reset link request submitted");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong";

      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800">
            Forgot Password?
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your email and we'll send you a
            password reset link.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          autoComplete="off"
        >
          <div>
            <label className="font-medium">
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
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="off"
                className="
                  w-full
                  p-3
                  outline-none
                  bg-transparent
                "
              />
            </div>
          </div>

          {/* Success Message */}

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
              ? "Sending..."
              : "Send Reset Link"}
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
};

export default ForgotPassword;