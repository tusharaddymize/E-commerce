import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const BestSellingCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl shadow border overflow-hidden hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-gray-50">

        <button className="absolute right-4 top-4 z-10 bg-white shadow w-10 h-10 rounded-full flex items-center justify-center hover:text-red-500">
          <FiHeart />
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">

        <h3 className="text-lg font-semibold">
          {product.title}
        </h3>

        <div className="flex justify-center items-center gap-2 mt-2">
          <FaStar className="text-yellow-400" />
          <span>{product.rating}</span>
        </div>

        <div className="flex justify-center gap-2 mt-3">
          <span className="text-2xl font-bold text-[#355E3B]">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{product.oldPrice}
          </span>
        </div>

        <button className="mt-5 w-full h-11 rounded-xl bg-[#355E3B] text-white flex items-center justify-center gap-2 hover:bg-[#27452d] transition">
          <FiShoppingCart />
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default BestSellingCard;