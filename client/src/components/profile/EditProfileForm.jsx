import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  zodResolver,
} from "@hookform/resolvers/zod";

import useAuth from "../../hooks/useAuth";

import {
  updateProfile,
  uploadAvatar,
} from "../../services/userService";

import AvatarUpload from "./AvatarUpload";


// ==========================================
// Validation Schema
// ==========================================

const schema = z.object({
  name: z
    .string()
    .min(
      2,
      "Minimum 2 characters"
    ),

  phone: z
    .string()
    .min(
      10,
      "Invalid phone number"
    ),

  addressFullName: z
    .string()
    .min(
      2,
      "Enter full name"
    ),

  addressPhone: z
    .string()
    .min(
      10,
      "Enter valid phone number"
    ),

  address: z
    .string()
    .min(
      5,
      "Enter complete address"
    ),

  city: z
    .string()
    .min(
      2,
      "Enter city"
    ),

  state: z
    .string()
    .min(
      2,
      "Enter state"
    ),

  pincode: z
    .string()
    .min(
      5,
      "Enter valid pincode"
    ),

  country: z
    .string()
    .min(
      2,
      "Enter country"
    ),

  isDefault: z.boolean(),
});


// ==========================================
// Component
// ==========================================

const EditProfileForm = () => {
  const navigate = useNavigate();

  const {
    user,
    setUser,
  } = useAuth();

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // Existing Address
  // ==========================================

  const existingAddress =
    user?.addresses?.find(
      (item) =>
        item.isDefault
    ) ||
    user?.addresses?.[0] ||
    null;


  // ==========================================
  // Form
  // ==========================================

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    resolver:
      zodResolver(schema),

    defaultValues: {
      name:
        user?.name || "",

      phone:
        user?.phone || "",

      addressFullName:
        existingAddress?.fullName ||
        user?.name ||
        "",

      addressPhone:
        existingAddress?.phone ||
        user?.phone ||
        "",

      address:
        existingAddress?.address ||
        "",

      city:
        existingAddress?.city ||
        "",

      state:
        existingAddress?.state ||
        "",

      pincode:
        existingAddress?.pincode ||
        "",

      country:
        existingAddress?.country ||
        "India",

      isDefault:
        existingAddress?.isDefault ??
        true,
    },
  });


  // ==========================================
  // Update Form When User Loads
  // ==========================================

  useEffect(() => {
    if (!user) return;

    const address =
      user.addresses?.find(
        (item) =>
          item.isDefault
      ) ||
      user.addresses?.[0] ||
      null;

    reset({
      name:
        user.name || "",

      phone:
        user.phone || "",

      addressFullName:
        address?.fullName ||
        user.name ||
        "",

      addressPhone:
        address?.phone ||
        user.phone ||
        "",

      address:
        address?.address ||
        "",

      city:
        address?.city ||
        "",

      state:
        address?.state ||
        "",

      pincode:
        address?.pincode ||
        "",

      country:
        address?.country ||
        "India",

      isDefault:
        address?.isDefault ??
        true,
    });
  }, [user, reset]);


  // ==========================================
  // Submit
  // ==========================================

  const onSubmit = async (
    values
  ) => {
    try {
      setLoading(true);

      // ======================================
      // Existing Address ID
      // ======================================

      const currentAddress =
        user?.addresses?.find(
          (item) =>
            item.isDefault
        ) ||
        user?.addresses?.[0] ||
        null;


      // ======================================
      // Prepare Data
      // ======================================

      const profileData = {
        name:
          values.name,

        phone:
          values.phone,

        addressId:
          currentAddress?._id ||
          undefined,

        addressFullName:
          values.addressFullName,

        addressPhone:
          values.addressPhone,

        address:
          values.address,

        city:
          values.city,

        state:
          values.state,

        pincode:
          values.pincode,

        country:
          values.country,

        isDefault:
          values.isDefault,
      };


      // ======================================
      // Update Profile + Address
      // ======================================

      const profileResponse =
        await updateProfile(
          profileData
        );


      if (
        profileResponse?.user
      ) {
        setUser(
          profileResponse.user
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            profileResponse.user
          )
        );
      }


      // ======================================
      // Upload Avatar
      // ======================================

      if (image) {
        const formData =
          new FormData();

        formData.append(
          "avatar",
          image
        );

        const avatarResponse =
          await uploadAvatar(
            formData
          );

        if (
          avatarResponse?.user
        ) {
          setUser(
            avatarResponse.user
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              avatarResponse.user
            )
          );
        }
      }


      // ======================================
      // Success
      // ======================================

      alert(
        "Profile and address updated successfully"
      );

      navigate("/profile");

    } catch (error) {
      console.error(
        "Profile Update Error:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Profile update failed"
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // Error Helper
  // ==========================================

  const inputClass = `
    w-full
    border
    border-gray-300
    p-3
    mt-2
    outline-none
    transition-all
    duration-200
    focus:border-[#f4512a]
    focus:ring-2
    focus:ring-[#f4512a]/10
  `;


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

      {/* ==================================== */}
      {/* Avatar */}
      {/* ==================================== */}

      <AvatarUpload
        image={user?.avatar}
        setImage={setImage}
      />


      {/* ==================================== */}
      {/* Form */}
      {/* ==================================== */}

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="mt-8 space-y-8"
      >

        {/* ================================= */}
        {/* Personal Information */}
        {/* ================================= */}

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-gray-900
            "
          >
            Personal Information
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Update your basic account
            information.
          </p>


          {/* Name */}

          <div className="mt-5">

            <label
              className="
                block
                font-medium
                text-gray-700
              "
            >
              Full Name
            </label>

            <input
              {...register("name")}
              className={inputClass}
              style={{
                borderRadius:
                  "var(--border-radius, 8px)",
              }}
            />

            {errors.name && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              >
                {
                  errors.name
                    .message
                }
              </p>
            )}

          </div>


          {/* Phone */}

          <div className="mt-5">

            <label
              className="
                block
                font-medium
                text-gray-700
              "
            >
              Phone Number
            </label>

            <input
              {...register("phone")}
              className={inputClass}
              style={{
                borderRadius:
                  "var(--border-radius, 8px)",
              }}
            />

            {errors.phone && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              >
                {
                  errors.phone
                    .message
                }
              </p>
            )}

          </div>

        </div>


        {/* ================================= */}
        {/* Delivery Address */}
        {/* ================================= */}

        <div
          className="
            border-t
            border-gray-200
            pt-7
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                Delivery Address
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                Add the address where
                you want your orders
                delivered.
              </p>

            </div>

          </div>


          {/* Address Name + Phone */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              mt-5
            "
          >

            {/* Address Full Name */}

            <div>

              <label
                className="
                  block
                  font-medium
                  text-gray-700
                "
              >
                Recipient Name
              </label>

              <input
                {...register(
                  "addressFullName"
                )}
                placeholder="Enter recipient name"
                className={inputClass}
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              />

              {errors.addressFullName && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors
                      .addressFullName
                      .message
                  }
                </p>
              )}

            </div>


            {/* Address Phone */}

            <div>

              <label
                className="
                  block
                  font-medium
                  text-gray-700
                "
              >
                Delivery Phone
              </label>

              <input
                {...register(
                  "addressPhone"
                )}
                placeholder="Enter delivery phone"
                className={inputClass}
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              />

              {errors.addressPhone && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors
                      .addressPhone
                      .message
                  }
                </p>
              )}

            </div>

          </div>


          {/* Complete Address */}

          <div className="mt-5">

            <label
              className="
                block
                font-medium
                text-gray-700
              "
            >
              Complete Address
            </label>

            <textarea
              {...register(
                "address"
              )}
              rows={4}
              placeholder="
                House No., Building,
                Street, Area
              "
              className={inputClass}
              style={{
                borderRadius:
                  "var(--border-radius, 8px)",
              }}
            />

            {errors.address && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              >
                {
                  errors.address
                    .message
                }
              </p>
            )}

          </div>


          {/* City / State */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              mt-5
            "
          >

            {/* City */}

            <div>

              <label
                className="
                  block
                  font-medium
                  text-gray-700
                "
              >
                City
              </label>

              <input
                {...register("city")}
                placeholder="Enter city"
                className={inputClass}
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              />

              {errors.city && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors.city
                      .message
                  }
                </p>
              )}

            </div>


            {/* State */}

            <div>

              <label
                className="
                  block
                  font-medium
                  text-gray-700
                "
              >
                State
              </label>

              <input
                {...register("state")}
                placeholder="Enter state"
                className={inputClass}
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              />

              {errors.state && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors.state
                      .message
                  }
                </p>
              )}

            </div>

          </div>


          {/* Pincode / Country */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              mt-5
            "
          >

            {/* Pincode */}

            <div>

              <label
                className="
                  block
                  font-medium
                  text-gray-700
                "
              >
                Pincode
              </label>

              <input
                {...register(
                  "pincode"
                )}
                placeholder="Enter pincode"
                className={inputClass}
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              />

              {errors.pincode && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors.pincode
                      .message
                  }
                </p>
              )}

            </div>


            {/* Country */}

            <div>

              <label
                className="
                  block
                  font-medium
                  text-gray-700
                "
              >
                Country
              </label>

              <input
                {...register(
                  "country"
                )}
                className={inputClass}
                style={{
                  borderRadius:
                    "var(--border-radius, 8px)",
                }}
              />

              {errors.country && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1
                  "
                >
                  {
                    errors.country
                      .message
                  }
                </p>
              )}

            </div>

          </div>


          {/* Default Address */}

          <label
            className="
              flex
              items-center
              gap-3
              mt-5
              cursor-pointer
              select-none
            "
          >

            <input
              type="checkbox"
              {...register(
                "isDefault"
              )}
              className="
                w-4
                h-4
                accent-[#f4512a]
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Make this my default
              delivery address
            </span>

          </label>

        </div>


        {/* ================================= */}
        {/* Save Button */}
        {/* ================================= */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3.5
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
              "#f4512a",

            borderRadius:
              "var(--border-radius, 8px)",
          }}
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default EditProfileForm;