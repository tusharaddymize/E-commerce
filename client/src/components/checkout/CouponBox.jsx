import { useState } from "react";
import { FiTag } from "react-icons/fi";

const CouponBox = ({ subTotal, onApply }) => {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appliedInfo, setAppliedInfo] =
    useState(null);

  // ==========================================
  // Apply Coupon
  // ==========================================

  const applyCoupon = async () => {
    const code = coupon
      .trim()
      .toUpperCase();

    if (!code) {
      setSuccess(false);
      setMessage(
        "Please enter a coupon code."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/coupons/apply",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            code,
            orderAmount: subTotal,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSuccess(false);

        setMessage(
          `❌ ${
            data.message ||
            "Invalid coupon code."
          }`
        );

        return;
      }

      // ======================================
      // Applied Coupon
      // ======================================

      setAppliedInfo({
        code: data.coupon.code,
        description:
          data.coupon.description,
        discount: data.discount,
      });

      onApply({
        code: data.coupon.code,
        discount: data.discount,
        finalAmount: data.finalAmount,
      });

      setSuccess(true);

      setMessage(
        `🎉 ${
          data.coupon.description ||
          data.coupon.code
        } — you saved ₹${data.discount}`
      );
    } catch (error) {
      console.error(
        "Apply Coupon Error:",
        error
      );

      setSuccess(false);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Remove Coupon
  // ==========================================

  const removeCoupon = () => {
    setCoupon("");
    setMessage("");
    setSuccess(false);
    setAppliedInfo(null);

    onApply({
      code: "",
      discount: 0,
      finalAmount: subTotal,
    });
  };

  return (
    <div
      className="
        bg-white
        shadow-lg
        border
        border-gray-200
        p-6
      "
      style={{
        borderRadius:
          "var(--border-radius, 24px)",
      }}
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="flex items-center gap-3 mb-5">
        <div
          className="
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
          "
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary-color, #355E3B) 10%, transparent)",
          }}
        >
          <FiTag
            className="text-xl"
            style={{
              color:
                "var(--primary-color, #355E3B)",
            }}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Coupon Code
          </h2>

          <p className="text-gray-500 text-sm">
            Apply coupon to get instant
            discount.
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* Coupon Input */}
      {/* ====================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
        "
      >
        <input
          type="text"
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !loading &&
              !success
            ) {
              applyCoupon();
            }
          }}
          placeholder="Enter Coupon"
          disabled={success}
          className="
            flex-1
            h-12
            border
            border-gray-300
            px-4
            outline-none
            transition
            disabled:bg-gray-100
          "
          style={{
            borderRadius:
              "var(--border-radius, 12px)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              "var(--primary-color, #355E3B)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "#d1d5db";
          }}
        />

        {/* Apply Button */}

        <button
          type="button"
          onClick={applyCoupon}
          disabled={loading || success}
          className="
            h-12
            px-6
            text-white
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
              "var(--border-radius, 12px)",
          }}
        >
          {loading
            ? "Applying..."
            : success
            ? "Applied"
            : "Apply"}
        </button>
      </div>

      {/* ====================================== */}
      {/* Message */}
      {/* ====================================== */}

      {message && (
        <p
          className={`mt-4 font-medium ${
            success
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* ====================================== */}
      {/* Coupon Information */}
      {/* ====================================== */}

      {success &&
        appliedInfo?.description && (
          <p className="mt-1 text-sm text-gray-500 italic">
            {appliedInfo.code} —{" "}
            {appliedInfo.description}
          </p>
        )}

      {/* ====================================== */}
      {/* Remove Coupon */}
      {/* ====================================== */}

      {success && (
        <button
          type="button"
          onClick={removeCoupon}
          className="
            mt-4
            text-red-500
            font-medium
            hover:underline
          "
        >
          Remove Coupon
        </button>
      )}
    </div>
  );
};

export default CouponBox;