import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const NewArrivalCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Image */}
      <div className="relative overflow-hidden">

        {/* NEW Badge */}
        <span className="absolute left-4 top-4 z-10 bg-[#355E3B] text-white text-xs px-3 py-1 rounded-full font-semibold">
          NEW
        </span>

        {/* Wishlist */}
        <button className="absolute right-4 top-4 z-10 bg-white w-10 h-10 rounded-full shadow flex justify-center items-center hover:text-red-500">
          <FiHeart />
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
        />

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="text-xl font-semibold">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mt-3">
          <FaStar className="text-yellow-400" />
          <span>{product.rating}</span>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-[#355E3B]">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{product.oldPrice}
          </span>
        </div>

        <button className="w-full mt-5 h-11 rounded-xl bg-[#355E3B] text-white flex justify-center items-center gap-2 hover:bg-[#27452d] transition">
          <FiShoppingCart />
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default NewArrivalCard;