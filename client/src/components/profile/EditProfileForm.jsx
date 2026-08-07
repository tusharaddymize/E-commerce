import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";
import {
  updateProfile,
  uploadAvatar,
} from "../../services/userService";

import AvatarUpload from "./AvatarUpload";

const schema = z.object({
  name: z.string().min(2, "Minimum 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
});

const EditProfileForm = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      // ============================
      // Update Profile
      // ============================

      const profileResponse = await updateProfile(values);

      if (profileResponse?.user) {
        setUser(profileResponse.user);

        localStorage.setItem(
          "user",
          JSON.stringify(profileResponse.user)
        );
      }

      // ============================
      // Upload Avatar
      // ============================

      if (image) {
        const formData = new FormData();

        formData.append("avatar", image);

        const avatarResponse = await uploadAvatar(
          formData
        );

        if (avatarResponse?.user) {
          setUser(avatarResponse.user);

          localStorage.setItem(
            "user",
            JSON.stringify(avatarResponse.user)
          );
        }
      }

      alert("Profile Updated Successfully");

      navigate("/profile");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-white
        shadow-xl
        p-5
        sm:p-6
        md:p-8
      "
      style={{
        borderRadius:
          "var(--border-radius, 16px)",
      }}
    >
      {/* ============================
          Avatar Upload
      ============================ */}

      <AvatarUpload
        image={user?.avatar}
        setImage={setImage}
      />

      {/* ============================
          Form
      ============================ */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}

        <div>
          <label className="block font-medium text-gray-700">
            Full Name
          </label>

          <input
            {...register("name")}
            className="
              w-full
              border
              p-3
              mt-2
              outline-none
              transition-all
              duration-300
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor =
                "var(--primary-color, #355E3B)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor =
                "#d1d5db")
            }
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="block font-medium text-gray-700">
            Phone Number
          </label>

          <input
            {...register("phone")}
            className="
              w-full
              border
              p-3
              mt-2
              outline-none
              transition-all
              duration-300
            "
            style={{
              borderRadius:
                "var(--border-radius, 8px)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor =
                "var(--primary-color, #355E3B)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor =
                "#d1d5db")
            }
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3
            text-white
            font-semibold
            transition-all
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
            ? "Updating..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;