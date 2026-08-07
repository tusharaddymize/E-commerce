import {
  FaGooglePay,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
} from "react-icons/fa";

const PaymentMethod = ({ form, setForm }) => {
  // ==========================================
  // Payment Options
  // ==========================================

  const paymentOptions = [
    {
      id: "UPI",
      title: "UPI Payment",
      description: "Google Pay, PhonePe, Paytm",
      icon: FaGooglePay,
    },
    {
      id: "Credit Card",
      title: "Credit / Debit Card",
      description: "Visa, MasterCard, RuPay",
      icon: FaCreditCard,
    },
    {
      id: "Net Banking",
      title: "Net Banking",
      description: "All Major Banks",
      icon: FaUniversity,
    },
    {
      id: "COD",
      title: "Cash On Delivery",
      description: "Pay after receiving your order",
      icon: FaMoneyBillWave,
    },
  ];

  return (
    <div
      className="
        bg-white
        shadow-lg
        border
        border-gray-200
        p-5
        sm:p-8
      "
      style={{
        borderRadius:
          "var(--border-radius, 24px)",
      }}
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <h2 className="text-2xl font-bold mb-8">
        Payment Method
      </h2>

      {/* ====================================== */}
      {/* Payment Options */}
      {/* ====================================== */}

      <div className="space-y-5">
        {paymentOptions.map((option) => {
          const Icon = option.icon;

          const selected =
            form.paymentMethod === option.id;

          return (
            <label
              key={option.id}
              className="
                flex
                items-center
                justify-between
                gap-4
                border
                p-4
                sm:p-5
                cursor-pointer
                transition-all
                duration-300
              "
              style={{
                borderRadius:
                  "var(--border-radius, 16px)",

                borderColor: selected
                  ? "var(--primary-color, #355E3B)"
                  : "#e5e7eb",

                backgroundColor: selected
                  ? "color-mix(in srgb, var(--primary-color, #355E3B) 6%, white)"
                  : "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--primary-color, #355E3B)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  selected
                    ? "var(--primary-color, #355E3B)"
                    : "#e5e7eb";
              }}
            >
              {/* Left */}

              <div className="flex items-center gap-4 min-w-0">
                <Icon
                  className="
                    text-2xl
                    sm:text-3xl
                    shrink-0
                  "
                  style={{
                    color:
                      "var(--primary-color, #355E3B)",
                  }}
                />

                <div className="min-w-0">
                  <h3 className="font-bold">
                    {option.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Radio */}

              <input
                type="radio"
                name="paymentMethod"
                value={option.id}
                checked={selected}
                onChange={() =>
                  setForm({
                    ...form,
                    paymentMethod: option.id,
                  })
                }
                className="
                  w-5
                  h-5
                  shrink-0
                  cursor-pointer
                  accent-[var(--primary-color)]
                "
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;