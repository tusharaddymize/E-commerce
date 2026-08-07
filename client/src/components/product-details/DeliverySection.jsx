import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillWave,
  FaUndoAlt,
} from "react-icons/fa";

const DeliverySection = () => {
  const [pincode, setPincode] =
    useState("");

  const [checked, setChecked] =
    useState(false);

  // ==========================================
  // Pincode Change
  // ==========================================

  const handlePincodeChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(
      /\D/g,
      ""
    );

    setPincode(value);

    // Hide previous result if pincode changes
    setChecked(false);
  };

  // ==========================================
  // Check Delivery
  // ==========================================

  const handleCheck = () => {
    if (/^\d{6}$/.test(pincode)) {
      setChecked(true);

      toast.success(
        "Delivery available for this pincode."
      );

      return;
    }

    setChecked(false);

    toast.error(
      "Please enter a valid 6-digit pincode."
    );
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
            Check
          </button>

        </div>

        {/* ====================================== */}
        {/* Result */}
        {/* ====================================== */}

        {checked && (
          <div className="mt-8 space-y-5">

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
                  Delivery by Tomorrow
                </h4>

                <p className="text-gray-500 text-sm mt-1">
                  Free delivery on eligible orders.
                </p>
              </div>

            </div>

            {/* Cash On Delivery */}

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
        )}

      </div>

    </section>
  );
};

export default DeliverySection;