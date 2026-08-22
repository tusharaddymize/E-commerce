import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillWave,
  FaUndoAlt,
} from "react-icons/fa";

const DeliverySection = ({ product }) => {
const [pincode, setPincode] = useState("");

const [loading, setLoading] = useState(false);

const [result, setResult] = useState(null);

  // ==========================================
  // Pincode Change
  // ==========================================

const handlePincodeChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");

  setPincode(value);

  // Old API result remove
  setResult(null);
};

  // ==========================================
  // Check Delivery
  // ==========================================
const handleCheck = async () => {
  // ==========================================
  // Validate Pincode
  // ==========================================

  if (!/^\d{6}$/.test(pincode)) {
    setResult(null);

    toast.error(
      "Please enter a valid 6-digit pincode."
    );

    return;
  }

  // ==========================================
  // Check Product
  // ==========================================

  if (!product?._id) {
    toast.error(
      "Product information is missing."
    );

    return;
  }

  try {
    setLoading(true);
    setResult(null);

    // ========================================
    // API Call
    // ========================================

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delivery/check`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId: product._id,
          pincode: pincode,
        }),
      }
    );

    const data = await response.json();

    // ========================================
    // API Error
    // ========================================

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Unable to check delivery."
      );
    }

    // ========================================
    // Save Result
    // ========================================

    setResult(data);

    // ========================================
    // Success / Failure Toast
    // ========================================

    if (data.available) {
      toast.success(
        "Delivery is available for this pincode."
      );
    } else {
      toast.error(
        "Delivery is not available for this pincode."
      );
    }

  } catch (error) {
    console.error(
      "Delivery Check Error:",
      error
    );

    setResult(null);

    toast.error(
      error.message ||
        "Unable to check delivery."
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <section className="mt-14">

      <div
        className="
          bg-white

          shadow-sm

          border
          border-gray-200

          p-6
          sm:p-8
        "
        style={{
          borderRadius:
            "var(--border-radius, 12px)",
        }}
      >
        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Delivery Information
        </h2>

        {/* ====================================== */}
        {/* Pincode */}
        {/* ====================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row

            gap-4
          "
        >
          <div className="relative flex-1">

            <FaMapMarkerAlt
              className="
                absolute

                left-4
                top-1/2

                -translate-y-1/2

                text-[var(--color-primary,#355E3B)]
              "
            />

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter Pincode"
              value={pincode}
              onChange={handlePincodeChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCheck();
                }
              }}
              className="
                w-full
                h-14

                pl-12
                pr-4

                border
                border-gray-300

                outline-none

                transition-all
                duration-300

                focus:border-[var(--color-primary,#355E3B)]
                focus:ring-1
                focus:ring-[var(--color-primary,#355E3B)]
              "
              style={{
                borderRadius:
                  "var(--border-radius, 12px)",
              }}
            />

          </div>

          {/* Check Button */}

<button
  type="button"
  onClick={handleCheck}
  disabled={loading}
            className="
              h-14

              px-8

              bg-[var(--color-button,var(--color-primary,#355E3B))]
              text-white

              font-semibold

              transition-all
              duration-300

              hover:opacity-90
              active:scale-95
            "
            style={{
              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
           {loading ? "Checking..." : "Check"}
          </button>

        </div>

        {/* ====================================== */}
        {/* Result */}
        {/* ====================================== */}

{result && (
  <div className="mt-8">

    {/* ====================================== */}
    {/* Delivery Available */}
    {/* ====================================== */}

    {result.available ? (
      <div className="space-y-5">

        {/* Delivery */}

        <div className="flex items-start gap-4">

          <FaTruck
            className="
              text-2xl
              shrink-0
              text-[var(--color-primary,#355E3B)]
            "
          />

          <div>
<h4 className="font-bold">
  Delivery Available
</h4>

<p className="text-gray-500 text-sm mt-1">
  {result.message ||
    "We can deliver this product to your pincode."}
</p>

{result.data?.estimatedDelivery && (
  <p className="text-gray-600 text-sm mt-2">
    Estimated delivery:{" "}
    <span className="font-semibold">
      {result.data.estimatedDelivery} days
    </span>
  </p>
)}

<p className="text-gray-600 text-sm mt-1">
  Delivery charge:{" "}
  <span className="font-semibold">
    ₹{Number(result.data?.deliveryCharge || 0).toFixed(2)}
  </span>
</p>
          </div>

        </div>

        {/* COD */}

        {/* COD */}

{result.data?.codAvailable !== false && (
          <div className="flex items-start gap-4">

            <FaMoneyBillWave
              className="
                text-2xl
                shrink-0
                text-[var(--color-primary,#355E3B)]
              "
            />

            <div>
              <h4 className="font-bold">
                Cash on Delivery Available
              </h4>

              <p className="text-gray-500 text-sm mt-1">
                Pay when your order arrives.
              </p>
            </div>

          </div>
        )}

        {/* Return */}

        <div className="flex items-start gap-4">

          <FaUndoAlt
            className="
              text-2xl
              shrink-0
              text-[var(--color-primary,#355E3B)]
            "
          />

          <div>
            <h4 className="font-bold">
              Easy Returns
            </h4>

            <p className="text-gray-500 text-sm mt-1">
              7 Days Return Policy.
            </p>
          </div>

        </div>

      </div>

    ) : (

      /* ====================================== */
      /* Delivery NOT Available */
      /* ====================================== */

      <div
        className="
          border
          border-red-200
          bg-red-50
          p-5
        "
        style={{
          borderRadius:
            "var(--border-radius, 12px)",
        }}
      >

        <h4 className="font-bold text-red-600">
          Delivery Not Available
        </h4>

        <p className="text-red-500 text-sm mt-2">
          {result.message ||
            "Sorry, this product cannot be delivered to this pincode."}
        </p>

      </div>
    )}

  </div>
)}

      </div>

    </section>
  );
};

export default DeliverySection;