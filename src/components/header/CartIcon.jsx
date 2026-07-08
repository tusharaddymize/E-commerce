import { FiShoppingCart } from "react-icons/fi";

const CartIcon = () => {
  return (
    <button className="relative flex items-center gap-2">

      <div className="relative">

        <FiShoppingCart size={22} />

        <span
          className="
          absolute
          -top-2
          -right-2
          bg-orange-500
          text-white
          rounded-full
          text-[10px]
          px-1.5
          "
        >
          
        </span>

      </div>

      <span className="hidden xl:block text-sm">
        Cart
      </span>

    </button>
  );
};

export default CartIcon;