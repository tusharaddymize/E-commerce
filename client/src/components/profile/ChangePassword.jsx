import { useState } from "react";
import axios from "axios";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";

import toast from "react-hot-toast";
const PasswordInput = ({
  label,
  name,
  value,
  visible,
  toggleKey,
  placeholder,
  onChange,
  onToggle,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          block
          mb-2
          text-sm
          font-medium
          text-gray-700
        "
      >
        {label}
      </label>

      <div
        className="
          flex
          items-center
          border
          border-gray-300
          rounded-xl
          overflow-hidden
          transition-all

          focus-within:border-[var(--primary-color,#355E3B)]
          focus-within:ring-2
          focus-within:ring-[var(--primary-color,#355E3B)]/10
        "
      >
        <FiLock className="ml-4 text-gray-400 shrink-0" />

        <input
          id={name}
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={
            name === "currentPassword"
              ? "current-password"
              : "new-password"
          }
          className="
            w-full
            px-3
            py-3
            text-sm
            bg-transparent
            outline-none
          "
          required
        />

        <button
          type="button"
          onClick={() => onToggle(toggleKey)}
          className="
            p-4
            text-gray-500
            hover:text-[var(--primary-color,#355E3B)]
          "
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <FiEyeOff />
          ) : (
            <FiEye />
          )}
        </button>
      </div>
    </div>
  );
};
const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState({
      current: false,
      new: false,
      confirm: false,
    });

  // ==========================================
  // Input Change
  // ==========================================

  const changeHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // Toggle Password
  // ==========================================

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.newPassword.length < 6) {
      toast.error(
        "New password must be at least 6 characters"
      );
      return;
    }

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const { data } = await axios.put(
        "http://localhost:5000/api/users/change-password",
        {
          currentPassword:
            form.currentPassword,

          newPassword:
            form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        data?.message ||
          "Password updated successfully"
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Password Input
  // ==========================================

  // const PasswordInput = ({
  //   label,
  //   name,
  //   value,
  //   visible,
  //   toggleKey,
  //   placeholder,
  // }) => (
  //   <div>
  //     <label
  //       htmlFor={name}
  //       className="
  //         block
  //         mb-2

  //         text-sm
  //         font-medium
  //         text-gray-700
  //       "
  //     >
  //       {label}
  //     </label>

  //     <div
  //       className="
  //         flex
  //         items-center

  //         border
  //         border-gray-300

  //         rounded-xl

  //         overflow-hidden

  //         transition-all

  //         focus-within:border-[var(--primary-color,#355E3B)]
  //         focus-within:ring-2
  //         focus-within:ring-[var(--primary-color,#355E3B)]/10
  //       "
  //     >
  //       <FiLock className="ml-4 text-gray-400 shrink-0" />

  //       <input
  //         id={name}
  //         type={
  //           visible
  //             ? "text"
  //             : "password"
  //         }
  //         name={name}
  //         value={value}
  //         onChange={changeHandler}
  //         placeholder={placeholder}
  //         autoComplete="new-password"
  //         className="
  //           w-full

  //           px-3
  //           py-3

  //           text-sm

  //           bg-transparent

  //           outline-none
  //         "
  //         required
  //       />

  //       <button
  //         type="button"
  //         onClick={() =>
  //           togglePassword(toggleKey)
  //         }
  //         className="
  //           p-4
  //           text-gray-500

  //           hover:text-[var(--primary-color,#355E3B)]
  //         "
  //         aria-label={
  //           visible
  //             ? "Hide password"
  //             : "Show password"
  //         }
  //       >
  //         {visible ? (
  //           <FiEyeOff />
  //         ) : (
  //           <FiEye />
  //         )}
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <section
      id="change-password"
      className="
        bg-white

        border
        border-gray-200

        shadow-sm

        rounded-2xl

        overflow-hidden

        scroll-mt-40
      "
    >
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div
        className="
          flex
          items-center
          gap-3

          px-5
          sm:px-6

          py-4

          border-b
          border-gray-100
        "
      >
        <div
          className="
            w-10
            h-10

            flex
            items-center
            justify-center

            rounded-full

            bg-[var(--primary-color,#355E3B)]/10
            text-[var(--primary-color,#355E3B)]
          "
        >
          <FiShield size={19} />
        </div>

        <div>
          <h2
            className="
              text-lg
              sm:text-xl

              font-bold
              text-gray-900
            "
          >
            Change Password
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Keep your account secure
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* Form */}
      {/* ====================================== */}

      <form
        onSubmit={submitHandler}
        className="
          p-5
          sm:p-6

          space-y-5
        "
      >
<PasswordInput
  label="Current Password"
  name="currentPassword"
  value={form.currentPassword}
  visible={showPassword.current}
  toggleKey="current"
  placeholder="Enter current password"
  onChange={changeHandler}
  onToggle={togglePassword}
/>
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-5
          "
        >
<PasswordInput
  label="New Password"
  name="newPassword"
  value={form.newPassword}
  visible={showPassword.new}
  toggleKey="new"
  placeholder="Enter new password"
  onChange={changeHandler}
  onToggle={togglePassword}
/>

<PasswordInput
  label="Confirm Password"
  name="confirmPassword"
  value={form.confirmPassword}
  visible={showPassword.confirm}
  toggleKey="confirm"
  placeholder="Confirm new password"
  onChange={changeHandler}
  onToggle={togglePassword}
/>
        </div>

        <p className="text-xs text-gray-500">
          Password must contain at least
          6 characters.
        </p>

        {/* Button */}

        <div
          className="
            flex
            justify-end

            pt-1
          "
        >
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              sm:w-auto

              px-6
              py-3

              rounded-xl

              text-sm
              font-semibold

              text-white

              bg-[var(--primary-color,#355E3B)]

              transition-all
              duration-200

              hover:opacity-90

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;