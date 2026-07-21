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

  // ==========================
  // MongoDB ID Support
  // ==========================

  const productId =
    product._id || product.id;

  const liked =
    isInWishlist(productId);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <Link
        to={`/product/${productId}`}
        className="
          block
          max-w-[260px]
          mx-auto
          bg-white
          rounded-xl
          overflow-hidden
          border
          border-gray-200
          hover:border-gray-300
          hover:shadow-lg
          transition-all
          duration-300
        "
      >
        {/* ===================== */}
        {/* Product Image */}
        {/* ===================== */}

        <div
          className="
            relative
            h-56
            md:h-60
            bg-[#fafafa]
            overflow-hidden
            group
            p-2
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
              top-3
              right-3
              z-20
              w-8
              h-8
              rounded-full
              bg-white
              shadow
              flex
              items-center
              justify-center
              hover:scale-110
              transition
            "
          >
            <FiHeart
              className={`text-lg ${
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
                top-3
                left-3
                bg-red-500
                text-white
                text-[11px]
                font-semibold
                px-2
                py-1
                rounded-full
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
              rounded-lg
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* ===================== */}
        {/* Content */}
        {/* ===================== */}

        <div className="p-3">
                    {/* Title */}

          <h3
            className="
              text-[15px]
              font-medium
              leading-5
              line-clamp-2
              min-h-[40px]
              hover:text-[#355E3B]
              transition-colors
            "
          >
            {product.title}
          </h3>

          {/* Brand */}

          {product.brand && (
            <p className="mt-1 text-xs text-gray-500">
              {product.brand}
            </p>
          )}

          {/* Rating */}

          <div className="mt-2 flex items-center gap-1">

            <FaStar className="text-xs text-yellow-400" />

            <span className="text-sm font-medium">
              {(product.rating || 0).toFixed(1)}
            </span>

            <span className="text-xs text-gray-400">
              ({product.totalReviews || 0})
            </span>

          </div>

          {/* Price */}

          <div className="mt-3 flex items-center gap-2">

            <span className="text-lg font-bold text-[#355E3B]">
              ₹
              {Number(
                product.price || 0
              ).toLocaleString("en-IN")}
            </span>

            {product.oldPrice > 0 && (

              <span className="text-xs text-gray-400 line-through">
                ₹
                {Number(
                  product.oldPrice
                ).toLocaleString("en-IN")}
              </span>

            )}

          </div>

          {/* Stock */}

          <div className="mt-2 flex items-center justify-between">

            {product.stock > 0 ? (

              <span className="text-xs font-medium text-green-600">
                ✓ In Stock
              </span>

            ) : (

              <span className="text-xs font-medium text-red-500">
                ✕ Out of Stock
              </span>

            )}

            {product.sold > 0 && (

              <span className="text-[11px] text-gray-500">
                {product.sold} Sold
              </span>

            )}

          </div>

        </div>

      </Link>

    </motion.div>

  );

};

export default ProductCard;