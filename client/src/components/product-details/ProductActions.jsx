import { FaShoppingCart, FaBolt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductActions = ({ onAddToCart }) => {
  const navigate = useNavigate();

  // Add To Cart
  const handleAddToCart = () => {
    onAddToCart();
    toast.success("Added to Cart 🛒");
  };

  // Buy Now
  const handleBuyNow = () => {
    onAddToCart();
    toast.success("Added to Cart 🛒");
    navigate("/cart");
  };

  return (
    <div className="flex items-center gap-4 mt-10">
      {/* Add To Cart */}
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-[#355E3B] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#27452d] transition"
      >
        <FaShoppingCart />
        Add To Cart
      </button>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
      >
        <FaBolt />
        Buy Now
      </button>

      {/* Wishlist */}
      <button className="w-16 h-16 border rounded-2xl flex items-center justify-center hover:bg-gray-100 transition">
        <FaHeart />
      </button>
    </div>
  );
};

export default ProductActions;