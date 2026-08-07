import {
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductActions = ({
  product,
  onAddToCart,
  disabled = false,
}) => {
  const navigate = useNavigate();

  // ==========================================
  // Stock Status
  // ==========================================

  const isOutOfStock =
    disabled ||
    Number(product?.stock || 0) <= 0;

  // ==========================================
  // Add To Cart
  // ==========================================

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error(
        "Product is currently out of stock."
      );

      return;
    }

    onAddToCart?.();

    toast.success(
      "Added to cart"
    );
  };

  // ==========================================
  // Buy Now
  // ==========================================

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error(
        "Product is currently out of stock."
      );

      return;
    }

    onAddToCart?.();

    navigate("/cart");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="w-full">
      {/* ======================================
          OUT OF STOCK
      ====================================== */}

      {isOutOfStock && (
        <div
          className="
            mb-3

            w-full

            rounded-lg

            border
            border-red-200

            bg-red-50

            px-4
            py-2.5

            text-center

            text-xs
            sm:text-sm

            font-semibold

            text-red-600
          "
        >
          Currently Out of Stock
        </div>
      )}

      {/* ======================================
          ACTION BUTTONS
      ====================================== */}

      <div
        className="
          grid
          grid-cols-2

          gap-2
          sm:gap-3

          w-full
        "
      >
        {/* ====================================
            ADD TO CART
        ==================================== */}
<button
  type="button"
  onClick={handleAddToCart}
  disabled={isOutOfStock}
  className="
    w-full

    min-h-[48px]
    sm:min-h-[52px]

    px-2
    sm:px-4

    rounded-lg
    sm:rounded-xl

    border-2

    border-[var(--color-button,var(--color-primary,#355E3B))]

    bg-white

    text-[var(--color-button,var(--color-primary,#355E3B))]

    text-xs
    sm:text-sm
    lg:text-base

    font-bold

    flex
    items-center
    justify-center

    gap-1.5
    sm:gap-2

    transition-all
    duration-200

    hover:bg-[var(--color-button,var(--color-primary,#355E3B))]
    hover:text-white

    active:scale-[0.98]

    disabled:border-gray-200
    disabled:bg-gray-100
    disabled:text-gray-400

    disabled:cursor-not-allowed
    disabled:active:scale-100
  "
>
          <FaShoppingCart
            className="
              shrink-0

              text-sm
              sm:text-base
            "
          />

          <span className="whitespace-nowrap">
            Add to Cart
          </span>
        </button>

        {/* ====================================
            BUY NOW
        ==================================== */}

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="
            w-full

            min-h-[48px]
            sm:min-h-[52px]

            px-2
            sm:px-4

            rounded-lg
            sm:rounded-xl

            bg-[var(--color-button,var(--color-primary,#355E3B))]

            text-white

            text-xs
            sm:text-sm
            lg:text-base

            font-bold

            flex
            items-center
            justify-center

            gap-1.5
            sm:gap-2

            shadow-sm

            transition-all
            duration-200

            hover:opacity-90

            active:scale-[0.98]

            disabled:bg-gray-300
            disabled:text-gray-500

            disabled:shadow-none
            disabled:cursor-not-allowed
            disabled:active:scale-100
          "
        >
          <FaBolt
            className="
              shrink-0

              text-sm
              sm:text-base
            "
          />

          <span className="whitespace-nowrap">
            Buy Now
          </span>
        </button>
      </div>

      {/* ======================================
          SMALL INFO
      ====================================== */}

      {!isOutOfStock && (
        <p
          className="
            mt-2

            text-center

            text-[10px]
            sm:text-xs

            text-gray-400
          "
        >
          Secure checkout • Easy ordering
        </p>
      )}
    </div>
  );
};

export default ProductActions;