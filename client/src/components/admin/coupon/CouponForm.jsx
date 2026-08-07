import { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

import {
  createCoupon,
  updateCoupon,
} from "../../../services/couponService";

const initialState = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "",
  maxDiscount: "",
  usageLimit: "",
  expiryDate: "",
  isActive: true,
};

const CouponForm = ({
  coupon,
  onClose,
  refresh,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  const [saving, setSaving] =
    useState(false);

  // ==========================================
  // Load Coupon (Edit Mode)
  // ==========================================

  useEffect(() => {
    if (!coupon) return;

    setFormData({
      code: coupon.code || "",

      description:
        coupon.description || "",

      discountType:
        coupon.discountType || "percentage",

      discountValue:
        coupon.discountValue || "",

      minOrderAmount:
        coupon.minOrderAmount || "",

      maxDiscount:
        coupon.maxDiscount || "",

      usageLimit:
        coupon.usageLimit || "",

      expiryDate: coupon.expiryDate
        ? coupon.expiryDate.slice(0, 10)
        : "",

      isActive: coupon.isActive,
    });
  }, [coupon]);

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (coupon) {
        await updateCoupon(
          coupon._id,
          formData
        );

        toast.success(
          "Coupon updated successfully."
        );
      } else {
        await createCoupon(formData);

        toast.success(
          "Coupon created successfully."
        );
      }

      refresh();

      onClose();

    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Part 7B Starts Here */}
               {/* Coupon Code */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Coupon Code
          </label>

          <input
            type="text"
            value={formData.code}
            onChange={(e) =>
              handleChange(
                "code",
                e.target.value.toUpperCase()
              )
            }
            placeholder="SAVE20"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            required
          />

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>

          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              handleChange(
                "description",
                e.target.value
              )
            }
            placeholder="Festival Offer"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />

        </div>

        {/* Discount Type */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Discount Type
          </label>

          <select
            value={formData.discountType}
            onChange={(e) =>
              handleChange(
                "discountType",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          >
            <option value="percentage">
              Percentage Discount
            </option>

            <option value="fixed">
              Fixed Amount Discount
            </option>

          </select>

        </div>

        {/* Discount Value */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Discount Value
          </label>

          <div className="relative">

            <input
              type="number"
              min="1"
              value={formData.discountValue}
              onChange={(e) =>
                handleChange(
                  "discountValue",
                  e.target.value
                )
              }
              placeholder={
                formData.discountType === "percentage"
                  ? "20"
                  : "200"
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              required
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">

              {formData.discountType ===
              "percentage"
                ? "%"
                : "₹"}

            </span>

          </div>

        </div>

        {/* Part 7C Starts Here */} 
                {/* Minimum Order Amount */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Minimum Order Amount
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
              ₹
            </span>

            <input
              type="number"
              min="0"
              value={formData.minOrderAmount}
              onChange={(e) =>
                handleChange(
                  "minOrderAmount",
                  e.target.value
                )
              }
              placeholder="500"
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

        </div>

        {/* Maximum Discount */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Maximum Discount
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
              ₹
            </span>

            <input
              type="number"
              min="0"
              value={formData.maxDiscount}
              onChange={(e) =>
                handleChange(
                  "maxDiscount",
                  e.target.value
                )
              }
              placeholder="300"
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

          </div>

        </div>

        {/* Usage Limit */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Usage Limit
          </label>

          <input
            type="number"
            min="1"
            value={formData.usageLimit}
            onChange={(e) =>
              handleChange(
                "usageLimit",
                e.target.value
              )
            }
            placeholder="100"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            required
          />

        </div>

        {/* Expiry Date */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Expiry Date
          </label>

          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) =>
              handleChange(
                "expiryDate",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            required
          />

        </div>

      </div>

      {/* Active / Inactive */}

      <div className="rounded-xl border border-gray-200 p-5">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-gray-800">
              Coupon Status
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Enable or disable this coupon.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              handleChange(
                "isActive",
                !formData.isActive
              )
            }
            className={`relative h-7 w-14 rounded-full transition ${
              formData.isActive
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                formData.isActive
                  ? "right-1"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

      {/* Part 7D Starts Here */}
            {/* Action Buttons */}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaTimes />

          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaSave />

          {saving
            ? coupon
              ? "Updating..."
              : "Creating..."
            : coupon
            ? "Update Coupon"
            : "Create Coupon"}
        </button>

      </div>

    </form>
  );
};

export default CouponForm;