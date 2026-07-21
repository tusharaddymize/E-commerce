import { useState } from "react";
import { FiTag } from "react-icons/fi";

const COUPONS = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME50: 50,
};

const CouponBox = ({ subTotal, onApply }) => {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setSuccess(false);
      setMessage("Please enter a coupon code.");
      return;
    }

    if (COUPONS[code]) {
      const discount = COUPONS[code];

      onApply({
        code,
        discount,
      });

      setSuccess(true);
      setMessage(`🎉 ${discount}% discount applied.`);
    } else {
      setSuccess(false);
      setMessage("❌ Invalid coupon code.");
    }
  };

  const removeCoupon = () => {
    setCoupon("");
    setMessage("");
    setSuccess(false);

    onApply({
      code: "",
      discount: 0,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border p-6">

      <div className="flex items-center gap-3 mb-5">

        <div className="w-12 h-12 rounded-full bg-[#355E3B]/10 flex items-center justify-center">
          <FiTag className="text-[#355E3B] text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Coupon Code
          </h2>

          <p className="text-gray-500 text-sm">
            Apply coupon to get instant discount.
          </p>
        </div>

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter Coupon"
          className="flex-1 h-12 border rounded-xl px-4 outline-none focus:border-[#355E3B]"
        />

        <button
          onClick={applyCoupon}
          className="px-6 bg-[#355E3B] text-white rounded-xl hover:bg-[#27452d] transition"
        >
          Apply
        </button>

      </div>

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

      {success && (
        <button
          onClick={removeCoupon}
          className="mt-4 text-red-500 hover:underline"
        >
          Remove Coupon
        </button>
      )}

      <div className="mt-6 border-t pt-4 text-sm text-gray-500">

        <p>Available Coupons</p>

        <ul className="mt-2 space-y-1">

          <li>
            <strong>SAVE10</strong> → 10% OFF
          </li>

          <li>
            <strong>SAVE20</strong> → 20% OFF
          </li>

          <li>
            <strong>WELCOME50</strong> → 50% OFF
          </li>

        </ul>

      </div>

    </div>
  );
};

export default CouponBox;