import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {

  const {
    addWishlist,
    removeWishlist,
    isInWishlist,
  } = useWishlist();

  // ===================================
  // MongoDB ID Support
  // ===================================

  const productId =
    product._id || product.id;

  const liked =
    isInWishlist(productId);

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
      }}
    >

      <Link
        to={`/product/${productId}`}
        className="
        block
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        "
      >

        {/* ===================== */}
        {/* Image */}
        {/* ===================== */}

        <div
          className="
          relative
          h-80
          md:h-96
          bg-[#f7f7f4]
          overflow-hidden
          rounded-t-2xl
          p-2
          group
          "
        >

          {/* Wishlist */}

          <button
            onClick={(e) => {

              e.preventDefault();

              if (liked) {

                removeWishlist(productId);

              } else {

                addWishlist({

                  ...product,

                  id: productId,

                });

              }

            }}
            className="
            absolute
            top-4
            right-4
            z-20
            bg-white
            w-10
            h-10
            rounded-full
            shadow
            flex
            items-center
            justify-center
            hover:scale-110
            transition
            "
          >

            <FiHeart
              className={`text-xl ${
                liked
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            />

          </button>

          {/* Discount */}

          {product.discount > 0 && (

            <span
              className="
              absolute
              top-4
              left-4
              bg-red-500
              text-white
              text-xs
              px-3
              py-1
              rounded-full
              font-semibold
              z-10
              "
            >

              {product.discount}% OFF

            </span>

          )}

          {/* Product Image */}

          <img
            src={
              product.thumbnail ||
              product.image ||
              product.images?.[0] ||
              "/placeholder.png"
            }
            alt={product.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src =
                "/placeholder.png";
            }}
            className="
            w-full
            h-full
            object-cover
            rounded-xl
            transition
            duration-500
            group-hover:scale-105
            "
          />

        </div>

        {/* ===================== */}
        {/* Content */}
        {/* ===================== */}

        <div className="p-5">
                    {/* Title */}

          <h3
            className="
            font-semibold
            text-lg
            line-clamp-2
            min-h-[56px]
            hover:text-[#355E3B]
            transition
            "
          >
            {product.title}
          </h3>

          {/* Brand */}

          {product.brand && (
            <p className="text-sm text-gray-500 mt-1">
              {product.brand}
            </p>
          )}

          {/* Rating */}

          <div className="flex items-center gap-2 mt-3">

            <FaStar className="text-yellow-400" />

            <span className="font-medium">
              {(product.rating || 0).toFixed(1)}
            </span>

            <span className="text-gray-400 text-sm">
              ({product.totalReviews || 0})
            </span>

          </div>

          {/* Price */}

          <div className="flex items-center gap-3 mt-4 flex-wrap">

            <span className="text-2xl font-bold text-[#355E3B]">

              ₹
              {Number(
                product.price || 0
              ).toLocaleString("en-IN")}

            </span>

            {product.oldPrice > 0 && (

              <span className="line-through text-gray-400">

                ₹
                {Number(
                  product.oldPrice
                ).toLocaleString("en-IN")}

              </span>

            )}

          </div>

          {/* Stock */}

          <div className="mt-3 flex items-center justify-between">

            {product.stock > 0 ? (

              <span className="text-green-600 text-sm font-medium">

                ✓ In Stock

              </span>

            ) : (

              <span className="text-red-500 text-sm font-medium">

                ✕ Out of Stock

              </span>

            )}

            {product.sold > 0 && (

              <span className="text-xs text-gray-500">

                {product.sold} Sold

              </span>

            )}

          </div>

          {/* View Details Button */}

          <button
            className="
            mt-5
            w-full
            h-11
            rounded-xl
            bg-[#355E3B]
            text-white
            font-semibold
            hover:bg-[#27452d]
            transition
            "
          >

            View Details

          </button>

        </div>

      </Link>

    </motion.div>

  );

};

export default ProductCard;