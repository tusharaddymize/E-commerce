import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiStar,
} from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({
  product,
  variant = "default",
}) => {
  const {
    addWishlist,
    removeWishlist,
    isInWishlist,
  } = useWishlist();

  const productId =
    product?._id || product?.id;

  const liked =
    isInWishlist(productId);

  // ==========================================
  // Price
  // ==========================================

  const formattedPrice = Number(
    product?.price || 0
  ).toLocaleString("en-IN");

  const formattedOldPrice = Number(
    product?.oldPrice || 0
  ).toLocaleString("en-IN");

  // ==========================================
  // Wishlist
  // ==========================================

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      removeWishlist(productId);
    } else {
      addWishlist({
        ...product,
        id: productId,
      });
    }
  };

  // ==========================================
  // EXPLORE PRODUCT CARD
  // ==========================================

  if (variant === "explore") {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.3,
        }}
        className="w-full h-full"
      >
        <Link
          to={`/product/${productId}`}
          className="
            group
            block
            w-full
            h-full

            bg-white

            border
            border-gray-200

            rounded-2xl

            overflow-hidden

            shadow-sm

            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-lg
            hover:border-gray-300
          "
        >
          {/* ================================== */}
          {/* Image */}
          {/* ================================== */}

          <div
            className="
              relative

              h-44
              sm:h-48
              md:h-52
              lg:h-56

              bg-gray-50

              overflow-hidden
            "
          >
            {/* Discount */}

            {Number(product?.discount) >
              0 && (
              <span
                className="
                  absolute
                  top-3
                  left-3
                  z-10

                  px-2.5
                  py-1

                  rounded-lg

                  bg-red-500
                  text-white

                  text-[10px]
                  sm:text-xs
                  font-bold

                  shadow-sm
                "
              >
                {product.discount}% OFF
              </span>
            )}

            {/* Wishlist */}

            <button
              type="button"
              aria-label={
                liked
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={handleWishlist}
              className="
                absolute
                top-3
                right-3
                z-20

                w-8
                h-8
                sm:w-9
                sm:h-9

                rounded-full

                bg-white/95

                border
                border-gray-100

                shadow-sm

                flex
                items-center
                justify-center

                transition-all
                duration-200

                hover:scale-110
                hover:shadow-md
              "
            >
              <FiHeart
                className={`
                  text-base
                  sm:text-lg

                  ${
                    liked
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }
                `}
              />
            </button>

            {/* Product Image */}

            <img
              src={
                product?.thumbnail ||
                product?.image ||
                product?.images?.[0] ||
                "/placeholder.png"
              }
              alt={
                product?.title ||
                "Product"
              }
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.png";
              }}
              className="
                w-full
                h-full

                object-contain

                p-2

                transition-transform
                duration-500

                group-hover:scale-105
              "
            />
          </div>

          {/* ================================== */}
          {/* Content */}
          {/* ================================== */}

          <div
            className="
              p-3
              sm:p-4
            "
          >
            {/* Brand */}

            {product?.brand && (
              <p
                className="
                  mb-1

                  text-[10px]
                  sm:text-xs

                  font-medium
                  uppercase
                  tracking-wide

                  text-gray-400

                  truncate
                "
              >
                {product.brand}
              </p>
            )}

            {/* Title */}

            <h3
              className="
                min-h-[40px]

                text-sm
                sm:text-[15px]

                leading-5

                font-semibold
                text-gray-900

                line-clamp-2

                transition-colors

                group-hover:text-[var(--color-primary)]
              "
            >
              {product?.title}
            </h3>

            {/* ================================= */}
            {/* Rating */}
            {/* ================================= */}

            <div
              className="
                mt-2

                flex
                items-center

                gap-1.5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-1

                  text-amber-500
                "
              >
                <FiStar
                  className="
                    fill-current
                    text-xs
                    sm:text-sm
                  "
                />

                <span
                  className="
                    text-xs
                    sm:text-sm

                    font-semibold

                    text-gray-700
                  "
                >
                  {Number(
                    product?.rating || 0
                  ).toFixed(1)}
                </span>
              </div>

              <span
                className="
                  text-[10px]
                  sm:text-xs

                  text-gray-400
                "
              >
                (
                {product?.totalReviews ||
                  0}
                )
              </span>
            </div>

            {/* ================================= */}
            {/* Price */}
            {/* ================================= */}

            <div
              className="
                mt-3

                flex
                items-end

                gap-2

                flex-wrap
              "
            >
              <span
                className="
                  text-lg
                  sm:text-xl

                  font-bold

                  text-[var(--color-primary)]                "
              >
                ₹{formattedPrice}
              </span>

              {Number(
                product?.oldPrice
              ) > 0 && (
                <span
                  className="
                    pb-[2px]

                    text-xs

                    text-gray-400

                    line-through
                  "
                >
                  ₹{formattedOldPrice}
                </span>
              )}
            </div>

            {/* ================================= */}
            {/* Stock / Sold */}
            {/* ================================= */}

            <div
              className="
                mt-3
                pt-3

                border-t
                border-gray-100

                flex
                items-center
                justify-between

                gap-2
              "
            >
              {Number(product?.stock) >
              0 ? (
                <span
                  className="
                    text-[11px]
                    sm:text-xs

                    font-semibold
text-[var(--color-primary)]
                  "
                >
                  In Stock
                </span>
              ) : (
                <span
                  className="
                    text-[11px]
                    sm:text-xs

                    font-semibold

                    text-red-500
                  "
                >
                  Out of Stock
                </span>
              )}

              {Number(product?.sold) >
                0 && (
                <span
                  className="
                    text-[11px]
                    sm:text-xs

                    text-gray-500
                  "
                >
                  {product.sold} Sold
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ==========================================
  // DEFAULT PRODUCT CARD
  // Featured Products etc.
  // ==========================================

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
      className="w-full"
    >
      <Link
        to={`/product/${productId}`}
        className="
          block
          w-full

          bg-white

          border
          border-gray-200

          overflow-hidden

          transition-all
          duration-300

          hover:border-gray-300
        "
      >
        {/* ================================== */}
        {/* Image */}
        {/* ================================== */}

        <div
          className="
            relative

            h-40
            sm:h-44
            md:h-48
            lg:h-56

            bg-white

            overflow-hidden

            group
          "
        >
          {/* Wishlist */}

          <button
            type="button"
            aria-label={
              liked
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            onClick={handleWishlist}
            className="
              absolute
              top-2
              right-2
              z-20

              w-7
              h-7

              rounded-full

              bg-white

              shadow-sm

              flex
              items-center
              justify-center

              transition-all

              hover:scale-110
            "
          >
            <FiHeart
              className={`text-base ${
                liked
                  ? "text-red-500 fill-red-500"
                  : "text-gray-500"
              }`}
            />
          </button>

          {/* Discount */}

          {Number(product?.discount) >
            0 && (
            <span
              className="
                absolute
                top-2
                left-2
                z-10

                bg-red-500
                text-white

                text-[10px]
                font-semibold

                px-2
                py-0.5

                rounded
              "
            >
              {product.discount}% OFF
            </span>
          )}

          <img
            src={
              product?.thumbnail ||
              product?.image ||
              product?.images?.[0] ||
              "/placeholder.png"
            }
            alt={
              product?.title ||
              "Product"
            }
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder.png";
            }}
            className="
              w-full
              h-full

              object-contain

              transition-transform
              duration-300

              group-hover:scale-105
            "
          />
        </div>

        {/* ================================== */}
        {/* Content */}
        {/* ================================== */}

        <div className="p-2">
          <h3
            className="
              text-xs
              sm:text-sm
              lg:text-[15px]

              font-medium

              leading-4

              line-clamp-2

              min-h-[32px]

              transition-colors

              hover:text-[var(--color-primary)]
            "
          >
            {product?.title}
          </h3>

          {product?.brand && (
            <p
              className="
                mt-1

                text-[11px]
                text-gray-500

                truncate
              "
            >
              {product.brand}
            </p>
          )}

          {/* Rating */}

          <div className="mt-2 flex items-center gap-1">
            <span
              className="
                flex
                items-center
                gap-1

               bg-[var(--color-primary)]
text-white

                px-1.5
                py-[2px]

                rounded

                text-[10px]
                font-medium
              "
            >
              {Number(
                product?.rating || 0
              ).toFixed(1)}
            </span>

            <span className="text-[11px] text-gray-500">
              (
              {product?.totalReviews ||
                0}
              )
            </span>
          </div>

          {/* Price */}

          <div
            className="
              mt-2

              flex
              items-center

              gap-1

              flex-wrap
            "
          >
            <span
              className="
                text-base
                font-bold

                text-[var(--color-primary)]              "
            >
              ₹{formattedPrice}
            </span>

            {Number(
              product?.oldPrice
            ) > 0 && (
              <span
                className="
                  text-[11px]
                  text-gray-400
                  line-through
                "
              >
                ₹{formattedOldPrice}
              </span>
            )}

            {Number(
              product?.discount
            ) > 0 && (
  <span
  className="
    text-[11px]
    text-red-500
    font-medium
  "
>
  {product.discount}% off
</span>
            )}
          </div>

          {/* Stock */}

          <div
            className="
              mt-2

              flex
              items-center
              justify-between
            "
          >
            {Number(product?.stock) >
            0 ? (
<span className="text-[11px] font-medium text-[var(--color-primary)]">
  In Stock
</span>
            ) : (
              <span className="text-[11px] font-medium text-red-500">
                Out of Stock
              </span>
            )}

            {Number(product?.sold) >
              0 && (
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