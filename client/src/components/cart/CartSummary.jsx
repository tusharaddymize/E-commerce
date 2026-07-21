import { FiShoppingBag, FiTruck } from "react-icons/fi";
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
      rounded-3xl
      shadow-lg
      border
      p-6
      sticky
      top-24
      "
    >

      {/* Heading */}

      <div className="flex items-center gap-4">

        <div
          className="
          w-12
          h-12
          rounded-full
          bg-[#355E3B]/10
          flex
          items-center
          justify-center
          "
        >

          <FiShoppingBag
            className="
            text-[#355E3B]
            text-xl
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

      {/* Divider */}

      <div className="border-t my-6"></div>

      {/* Price */}

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

      {/* Free Shipping */}

      {shipping > 0 && (

        <div
          className="
          mt-6
          bg-orange-50
          border
          border-orange-200
          rounded-2xl
          p-4
          "
        >

          <div className="flex gap-3">

            <FiTruck
              className="
              text-orange-500
              text-xl
              mt-1
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

      {/* Divider */}

      <div className="border-t my-6"></div>

      {/* Total */}

      <div className="flex justify-between items-center">

        <span className="text-xl font-bold">

          Grand Total

        </span>

        <span
          className="
          text-3xl
          font-black
          text-[#355E3B]
          "
        >

          ₹{total}

        </span>

      </div>

      {/* Checkout */}

      <button

        onClick={() =>
          navigate("/checkout")
        }

        className="
        w-full
        h-14
        mt-8
        rounded-2xl
        bg-[#355E3B]
        text-white
        font-bold
        hover:bg-[#27452d]
        transition
        "

      >

        Proceed To Checkout

      </button>

      {/* Continue Shopping */}

      <button

        onClick={() =>
          navigate("/")
        }

        className="
        w-full
        h-14
        mt-4
        rounded-2xl
        border-2
        border-[#355E3B]
        text-[#355E3B]
        font-bold
        hover:bg-[#355E3B]
        hover:text-white
        transition
        "

      >

        Continue Shopping

      </button>

    </div>

  );

};

export default CartSummary;