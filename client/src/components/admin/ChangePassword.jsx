import { useState } from "react";

import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { changeAdminPassword } from "../../services/adminService";
import toast from "react-hot-toast";

/* ==========================================
   PASSWORD INPUT
   IMPORTANT:
   Is component ko ChangePassword ke bahar
   rakha hai taaki typing ke time focus
   lose na ho.
========================================== */

const PasswordInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  visible,
  toggleVisible,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          block
          mb-2
          font-medium
          text-gray-700
        "
      >
        {label}
      </label>

      <div className="relative">
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

            border
            border-gray-300

            px-4
            py-3
            pr-12

            outline-none

            transition
            duration-200

            focus:border-[var(--primary-color,#355E3B)]
            focus:ring-1
            focus:ring-[var(--primary-color,#355E3B)]
          "
          style={{
            borderRadius:
              "var(--border-radius, 8px)",
          }}
        />

        {/* Show / Hide Password */}

        <button
          type="button"
          onClick={toggleVisible}
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2

            w-9
            h-9

            flex
            items-center
            justify-center

            text-gray-500

            rounded-lg

            hover:bg-gray-100
            hover:text-gray-800

            transition
          "
        >
          {visible ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   CHANGE PASSWORD
========================================== */

const ChangePassword = () => {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  /* ========================================
     INPUT CHANGE
  ======================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ========================================
     SUBMIT
  ======================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty Fields

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      toast.error(
        "Please fill all password fields"
      );

      return;
    }

    // Password Length

    if (form.newPassword.length < 6) {
      toast.error(
        "New password must be at least 6 characters"
      );

      return;
    }

    // Password Match

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      toast.error(
        "New password and confirm password do not match"
      );

      return;
    }

    // Same Password

    if (
      form.currentPassword ===
      form.newPassword
    ) {
      toast.error(
        "New password must be different from current password"
      );

      return;
    }

    try {
      setLoading(true);

      /* ====================================
         BACKEND API
      ==================================== */

      const response =
        await changeAdminPassword({
          currentPassword:
            form.currentPassword,

          newPassword:
            form.newPassword,
        });

      /* ====================================
         SUCCESS
      ==================================== */

      toast.success(
        response?.message ||
          "Password updated successfully"
      );

      // Clear Inputs

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Hide passwords again

      setShow({
        current: false,
        new: false,
        confirm: false,
      });
    } catch (error) {
      console.error(
        "Change Password Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ========================================
     UI
  ======================================== */

  return (
    <div
      className="
        bg-white
        shadow
        p-5
        sm:p-6
      "
      style={{
        borderRadius:
          "var(--border-radius, 12px)",
      }}
    >
      {/* ==================================== */}
      {/* HEADING */}
      {/* ==================================== */}

      <h2
        className="
          text-xl
          sm:text-2xl

          font-bold

          mb-6

          flex
          items-center
          gap-2
        "
      >
        <Lock
          size={21}
          style={{
            color:
              "var(--primary-color, #355E3B)",
          }}
        />

        Change Password
      </h2>

      {/* ==================================== */}
      {/* FORM */}
      {/* ==================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Current Password */}

        <PasswordInput
          label="Current Password"
          name="currentPassword"
          placeholder="Enter current password"
          value={form.currentPassword}
          onChange={handleChange}
          visible={show.current}
          toggleVisible={() =>
            setShow((prev) => ({
              ...prev,
              current: !prev.current,
            }))
          }
        />

        {/* New Password */}

        <PasswordInput
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
          value={form.newPassword}
          onChange={handleChange}
          visible={show.new}
          toggleVisible={() =>
            setShow((prev) => ({
              ...prev,
              new: !prev.new,
            }))
          }
        />

        {/* Confirm Password */}

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={form.confirmPassword}
          onChange={handleChange}
          visible={show.confirm}
          toggleVisible={() =>
            setShow((prev) => ({
              ...prev,
              confirm: !prev.confirm,
            }))
          }
        />

        {/* ================================== */}
        {/* SUBMIT BUTTON */}
        {/* ================================== */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            sm:w-auto

            min-h-12

            px-6
            py-3

            text-white
            font-semibold

            flex
            items-center
            justify-center
            gap-2

            transition
            duration-300

            hover:opacity-90
            active:scale-[0.98]

            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:active:scale-100
          "
          style={{
            backgroundColor:
              "var(--primary-color, #355E3B)",

            borderRadius:
              "var(--border-radius, 8px)",
          }}
        >
          {loading && (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;