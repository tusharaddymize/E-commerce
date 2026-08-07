import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

import { useCart } from "../../context/CartContext";

const CartIcon = () => {
  const { cartCount = 0 } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`Cart (${cartCount})`}
      className="
        relative

        flex
        items-center
        justify-center

        w-10
        h-10

        rounded-full

        text-gray-800

        hover:bg-gray-100
        hover:text-[var(--primary-color)]

        transition-all
        duration-300
      "
    >
      {/* Cart Icon */}

      <FiShoppingCart className="text-[22px]" />

      {/* Cart Count Badge */}

      {cartCount > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1

            min-w-[18px]
            h-[18px]

            px-1

            rounded-full

            bg-[var(--accent-color)]

            text-white
            text-[10px]
            font-bold

            flex
            items-center
            justify-center

            transition-colors
            duration-300
          "
        >
          {cartCount > 99
            ? "99+"
            : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;