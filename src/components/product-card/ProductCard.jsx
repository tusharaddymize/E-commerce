import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl">

<div className="relative h-96 bg-[#f7f7f4] overflow-hidden rounded-t-2xl p-2">
  <button className="absolute top-4 right-4 z-10 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center">
    <FiHeart />
  </button>

  <img
    src={product.image}
    alt={product.title}
    className="w-full h-full object-cover rounded-xl"
  />
</div>

      <div className="p-5 text-center">

        <h3 className="font-semibold text-lg">
          {product.title}
        </h3>

        <div className="flex justify-center items-center gap-2 mt-3">
          <FaStar className="text-yellow-400" />
          {product.rating}
        </div>

        <div className="flex justify-center items-center gap-2 mt-3">
          <span className="text-2xl font-bold text-[#355E3B]">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{product.oldPrice}
          </span>
        </div>

        <button className="w-full mt-5 bg-[#355E3B] text-white rounded-xl h-11 flex justify-center items-center gap-2 hover:bg-[#27452d] transition">
          <FiShoppingCart />
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;