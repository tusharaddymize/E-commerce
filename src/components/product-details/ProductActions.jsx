import { FaShoppingCart, FaBolt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductActions = ({ onAddToCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    onAddToCart();     // same function use karo
    navigate("/cart"); // cart par redirect
  };

  return (
    <div className="flex items-center gap-4 mt-10">
      <button
        onClick={onAddToCart}
        className="flex-1 bg-[#355E3B] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
      >
        <FaShoppingCart />
        Add To Cart
      </button>

      <button
        onClick={handleBuyNow}
        className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
      >
        <FaBolt />
        Buy Now
      </button>

      <button className="w-16 h-16 border rounded-2xl flex items-center justify-center">
        <FaHeart />
      </button>
    </div>
  );
};

export default ProductActions;