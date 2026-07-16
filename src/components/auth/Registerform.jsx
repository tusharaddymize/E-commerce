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
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

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
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setServerError("");

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await registerUser(payload);

      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="text-gray-500 mt-2">
          Join our store today
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Name */}

        <div>
          <label className="font-medium">
            Full Name
          </label>

          <div className="border rounded-lg flex items-center mt-2 px-3">

            <FaUser className="text-gray-400" />

            <input
              type="text"
              placeholder="Enter full name"
              className="w-full p-3 outline-none"
              {...register("name")}
            />

          </div>

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

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
              type={showPassword ? "text" : "password"}
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

        {/* Confirm Password */}

        <div>
          <label className="font-medium">
            Confirm Password
          </label>

          <div className="border rounded-lg flex items-center mt-2 px-3">

            <FaLock className="text-gray-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              className="w-full p-3 outline-none"
              {...register("confirmPassword")}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Server Error */}

        {serverError && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>

      <p className="text-center mt-6">
        Already have an account?

        <Link
          to="/login"
          className="text-green-600 font-semibold ml-2"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;