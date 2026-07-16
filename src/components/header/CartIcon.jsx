import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
    >
      <FiShoppingCart className="text-[22px]" />

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-orange-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;