import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";


const ProductCard = ({ product }) => {

const { addWishlist, removeWishlist, isInWishlist } = useWishlist();

const liked = isInWishlist(product.id);
  return (
  
    <Link
  to={`/product/${product.id}`}
  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>

      {/* Image Section */}

      <div className="relative h-96 bg-[#f7f7f4] overflow-hidden rounded-t-2xl p-2">

        {/* Wishlist */}

<button
  onClick={(e) => {
    e.preventDefault(); // Link open nahi hoga

    if (liked) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  }}
  className="absolute top-4 right-4 z-10 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center transition"
>
  <FiHeart
    className={`text-xl ${
      liked ? "text-red-500" : "text-gray-500"
    }`}
  />
</button>

        {/* Clickable Image */}

        <img
  src={product.image}
  alt={product.title}
  className="w-full h-full object-cover rounded-xl hover:scale-105 transition duration-500"
/>

      </div>

      {/* Content */}

      <div className="p-5 text-center">

        {/* Product Title */}

<h3 className="font-semibold text-lg hover:text-[#355E3B] transition">
  {product.title}
</h3>

        {/* Rating */}

        <div className="flex justify-center items-center gap-2 mt-3">

          <FaStar className="text-yellow-400" />

          <span>{product.rating}</span>

        </div>

        {/* Price */}

        <div className="flex justify-center items-center gap-2 mt-3">

          <span className="text-2xl font-bold text-[#355E3B]">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{product.oldPrice}
          </span>

        </div>

        {/* Add To Cart */}

{/* <button
  onClick={() => addToCart(product)}
  className="w-full mt-5 bg-[#355E3B] text-white rounded-xl h-11 flex justify-center items-center gap-2 hover:bg-[#27452d] transition"
>
  <FiShoppingCart />

  Add to Cart
</button> */}

      </div>

  </Link>
  );
};

export default ProductCard;