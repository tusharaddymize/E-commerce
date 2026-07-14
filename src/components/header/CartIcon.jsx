import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex items-center gap-2 hover:text-[#355E3B] transition"
    >
      <div className="relative">

        <FiShoppingCart size={22} />

        {cartCount > 0 && (
          <span
            className="
            absolute
            -top-2
            -right-2
            min-w-[18px]
            h-[18px]
            px-1
            flex
            items-center
            justify-center
            rounded-full
            bg-orange-500
            text-white
            text-[10px]
            font-bold
            "
          >
            {cartCount}
          </span>
        )}

      </div>

      <span className="hidden xl:block text-sm font-medium">
        Cart
      </span>
    </Link>
  );
};

export default CartIcon;