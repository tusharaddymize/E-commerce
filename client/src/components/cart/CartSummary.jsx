import {
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();

  const {
    cartCount,
    subTotal,
    shipping,
    gst,
    total,
  } = useCart();

  const remainingForFreeShipping = Math.max(
    0,
    999 - subTotal
  );

  return (
    <div
      className="
        bg-white
        shadow-lg
        border
        border-gray-200
        p-6
        sticky
        top-24
      "
      style={{
        borderRadius:
          "var(--border-radius, 12px)",
      }}
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div className="flex items-center gap-4">
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
              "color-mix(in srgb, var(--color-primary, #355E3B) 10%, transparent)",
          }}
        >
          <FiShoppingBag
            className="
              text-xl
              text-[var(--color-primary,#355E3B)]
            "
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <p className="text-gray-500">
            {cartCount} Item(s)
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* Divider */}
      {/* ====================================== */}

      <div className="border-t border-gray-200 my-6" />

      {/* ====================================== */}
      {/* Price */}
      {/* ====================================== */}

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            ₹{subTotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Shipping
          </span>

          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">
                FREE
              </span>
            ) : (
              <>₹{shipping}</>
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            GST (18%)
          </span>

          <span className="font-semibold">
            ₹{gst}
          </span>
        </div>
      </div>

      {/* ====================================== */}
      {/* Free Shipping */}
      {/* ====================================== */}

      {shipping > 0 && (
        <div
          className="
            mt-6
            bg-orange-50
            border
            border-orange-200
            p-4
          "
          style={{
            borderRadius:
              "var(--border-radius, 12px)",
          }}
        >
          <div className="flex gap-3">
            <FiTruck
              className="
                text-orange-500
                text-xl
                mt-1
                shrink-0
              "
            />

            <div>
              <h4 className="font-semibold">
                Add ₹{remainingForFreeShipping} more
              </h4>

              <p className="text-gray-600 text-sm mt-1">
                to unlock FREE Delivery.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* Divider */}
      {/* ====================================== */}

      <div className="border-t border-gray-200 my-6" />

      {/* ====================================== */}
      {/* Grand Total */}
      {/* ====================================== */}

      <div className="flex justify-between items-center gap-4">
        <span className="text-xl font-bold">
          Grand Total
        </span>

        <span
          className="
            text-3xl
            font-black
            text-[var(--color-primary,#355E3B)]
          "
        >
          ₹{total}
        </span>
      </div>

      {/* ====================================== */}
      {/* Checkout Button */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={() =>
          navigate("/checkout")
        }
        className="
          w-full
          h-14
          mt-8
          text-white
          font-bold
          transition-all
          duration-300
          hover:opacity-90
          active:scale-[0.98]
        "
        style={{
          backgroundColor:
            "var(--color-button, var(--color-primary, #355E3B))",

          borderRadius:
            "var(--border-radius, 12px)",
        }}
      >
        Proceed To Checkout
      </button>

      {/* ====================================== */}
      {/* Continue Shopping */}
      {/* ====================================== */}

      <button
        type="button"
        onClick={() =>
          navigate("/")
        }
        className="
          group
          w-full
          h-14
          mt-4
          border-2
          font-bold
          transition-all
          duration-300
          hover:text-white
          active:scale-[0.98]
        "
        style={{
          borderColor:
            "var(--color-primary, #355E3B)",

          color:
            "var(--color-primary, #355E3B)",

          borderRadius:
            "var(--border-radius, 12px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor =
            "var(--color-primary, #355E3B)";

          e.currentTarget.style.color =
            "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor =
            "transparent";

          e.currentTarget.style.color =
            "var(--color-primary, #355E3B)";
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CartSummary;