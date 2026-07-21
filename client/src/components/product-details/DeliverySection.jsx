import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaMoneyBillWave,
  FaUndoAlt,
} from "react-icons/fa";

const DeliverySection = () => {
  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (pincode.length === 6) {
      setChecked(true);
    } else {
      toast.error("Please enter a valid 6-digit pincode.");
    }
  };

  return (
    <section className="mt-14">

      <div className="bg-white rounded-3xl shadow-sm border p-6 sm:p-8">

        {/* Heading */}

        <h2 className="text-2xl font-bold mb-6">
          Delivery Information
        </h2>

        {/* Pincode */}

        <div className="flex flex-col sm:flex-row gap-4">

          <div className="relative flex-1">

            <FaMapMarkerAlt
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#355E3B]
              "
            />

            <input
              type="text"
              maxLength={6}
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value)
              }
              className="
              w-full
              h-14
              pl-12
              pr-4
              rounded-2xl
              border
              outline-none
              focus:border-[#355E3B]
              "
            />

          </div>

          <button
            onClick={handleCheck}
            className="
            h-14
            px-8
            rounded-2xl
            bg-[#355E3B]
            text-white
            font-semibold
            hover:bg-[#27452d]
            transition
            "
          >
            Check
          </button>

        </div>

        {/* Result */}

        {checked && (

          <div className="mt-8 space-y-5">

            {/* Delivery */}

            <div className="flex items-start gap-4">

              <FaTruck className="text-2xl text-[#355E3B]" />

              <div>

                <h4 className="font-bold">

                  Delivery by Tomorrow

                </h4>

                <p className="text-gray-500 text-sm">

                  Free delivery on eligible orders.

                </p>

              </div>

            </div>

            {/* COD */}

            <div className="flex items-start gap-4">

              <FaMoneyBillWave className="text-2xl text-[#355E3B]" />

              <div>

                <h4 className="font-bold">

                  Cash on Delivery Available

                </h4>

                <p className="text-gray-500 text-sm">

                  Pay when your order arrives.

                </p>

              </div>

            </div>

            {/* Return */}

            <div className="flex items-start gap-4">

              <FaUndoAlt className="text-2xl text-[#355E3B]" />

              <div>

                <h4 className="font-bold">

                  Easy Returns

                </h4>

                <p className="text-gray-500 text-sm">

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