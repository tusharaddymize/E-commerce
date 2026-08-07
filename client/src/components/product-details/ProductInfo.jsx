import { useEffect, useState } from "react";

import {
  FaStar,
  FaCheckCircle,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";
import ProductHighlights from "./ProductHighlights";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();

  const {
    addWishlist,
    removeWishlist,
    isInWishlist,
  } = useWishlist();

  // ==========================================
  // Product ID
  // ==========================================

  const productId =
    product?._id || product?.id;

  const liked =
    isInWishlist(productId);

  // ==========================================
  // States
  // ==========================================

  const [
    selectedSize,
    setSelectedSize,
  ] = useState(
    product?.sizes?.[0] || ""
  );

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(
    product?.colors?.[0] || ""
  );

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    descriptionOpen,
    setDescriptionOpen,
  ] = useState(false);

  // ==========================================
  // Reset Product Options
  // ==========================================

  useEffect(() => {
    setSelectedSize(
      product?.sizes?.[0] || ""
    );

    setSelectedColor(
      product?.colors?.[0] || ""
    );

    setQuantity(1);

    setDescriptionOpen(false);
  }, [product?._id]);

  // ==========================================
  // Price
  // ==========================================

  const price =
    Number(product?.price) || 0;

  const oldPrice =
    Number(product?.oldPrice) || 0;

  // Use backend discount if available.
  // Otherwise calculate from MRP.

  const calculatedDiscount =
    oldPrice > price && oldPrice > 0
      ? Math.round(
          ((oldPrice - price) /
            oldPrice) *
            100
        )
      : 0;

  const discount =
    Number(product?.discount) ||
    calculatedDiscount;

  // ==========================================
  // Add To Cart
  // ==========================================

  const handleAddToCart = () => {
    if (product?.stock <= 0) {
      return;
    }

    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
  };

  // ==========================================
  // Wishlist
  // ==========================================

  const handleWishlist = () => {
    if (liked) {
      removeWishlist(productId);

      return;
    }

    addWishlist({
      ...product,
      id: productId,
    });
  };

  // ==========================================
  // Share
  // ==========================================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Product link copied."
      );
    } catch (error) {
      console.error(
        "Share failed:",
        error
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="
        w-full
        min-w-0
      "
    >
      {/* ======================================
          BRAND + ACTIONS
      ====================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          {product?.brand && (
            <span
              className="
                inline-block

                text-xs
                sm:text-sm

                font-semibold

                uppercase
                tracking-wide

                text-[var(--color-primary,#355E3B)]
              "
            >
              {product.brand}
            </span>
          )}
        </div>

        {/* Wishlist / Share */}

        <div
          className="
            flex
            items-center
            gap-2

            shrink-0
          "
        >
          <button
            type="button"
            onClick={
              handleWishlist
            }
            aria-label={
              liked
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            className="
              w-9
              h-9

              sm:w-10
              sm:h-10

              rounded-full

              border
              border-gray-200

              bg-white

              flex
              items-center
              justify-center

              text-gray-700

              hover:border-red-200
              hover:bg-red-50

              transition
            "
          >
            {liked ? (
              <FaHeart
                className="
                  text-red-500
                "
              />
            ) : (
              <FaRegHeart />
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="
              w-9
              h-9

              sm:w-10
              sm:h-10

              rounded-full

              border
              border-gray-200

              bg-white

              flex
              items-center
              justify-center

              text-gray-700

              hover:bg-gray-50

              transition
            "
          >
            <FaShareAlt />
          </button>
        </div>
      </div>

      {/* ======================================
          TITLE
      ====================================== */}

      <h1
        className="
          mt-2

          text-xl
          sm:text-2xl
          lg:text-[26px]
          xl:text-[28px]

          leading-snug

          font-semibold

          text-gray-900
        "
      >
        {product?.title}
      </h1>

      {/* ======================================
          RATING / REVIEWS / SOLD
      ====================================== */}

      <div
        className="
          mt-3

          flex
          items-center
          flex-wrap

          gap-x-3
          gap-y-2

          text-sm
        "
      >
        {/* Rating */}

        <div
          className="
            inline-flex
            items-center
            gap-1.5
bg-[var(--color-primary,#355E3B)]
text-white
            px-2.5
            py-1

            rounded-md

            font-semibold
          "
        >
          <span>
            {Number(
              product?.rating || 0
            ).toFixed(1)}
          </span>

          <FaStar
            className="
              text-[11px]
            "
          />
        </div>

        {/* Reviews */}

        <span
          className="
            text-gray-500
            font-medium
          "
        >
          {product?.totalReviews ||
            0}{" "}
          Ratings & Reviews
        </span>

        {/* Sold */}

        {Number(product?.sold) >
          0 && (
          <>
            <span
              className="
                hidden
                sm:inline
                text-gray-300
              "
            >
              |
            </span>

            <span
              className="
                font-medium
                text-gray-600
              "
            >
              {product.sold}+ sold
            </span>
          </>
        )}
      </div>

      {/* ======================================
          DIVIDER
      ====================================== */}

      <div
        className="
          border-t
          border-gray-200

          my-4
        "
      />

      {/* ======================================
          PRICE
      ====================================== */}

      <div>
        {discount > 0 && (
          <p
            className="
              text-sm
              font-semibold
text-red-600

              mb-1
            "
          >
            {discount}% off
          </p>
        )}

        <div
          className="
            flex
            items-end
            flex-wrap

            gap-2.5
          "
        >
          <h2
            className="
              text-2xl
              sm:text-3xl

              font-bold

              leading-none

              text-gray-900
            "
          >
            ₹
            {price.toLocaleString(
              "en-IN"
            )}
          </h2>

          {oldPrice > price && (
            <span
              className="
                text-sm
                sm:text-base

                text-gray-400

                line-through
              "
            >
              ₹
              {oldPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

          {oldPrice > price && (
            <span
              className="
                text-xs
                text-gray-500
              "
            >
              MRP
            </span>
          )}
        </div>

        <p
          className="
            mt-2
            text-xs
            text-gray-500
          "
        >
          Inclusive of all taxes
        </p>
      </div>

      {/* ======================================
          STOCK
      ====================================== */}

      <div
        className={`
          mt-4

          inline-flex
          items-center
          gap-2

          text-sm
          font-semibold

${
  product?.stock > 0
    ? "text-[var(--color-primary,#355E3B)]"
    : "text-red-600"
}
        `}
      >
        <FaCheckCircle
          className="
            text-sm
          "
        />

        {product?.stock > 0
          ? "In Stock"
          : "Currently Out of Stock"}
      </div>

      {/* ======================================
          AVAILABLE OFFERS
      ====================================== */}

      <div
        className="
          mt-5

          border
          border-orange-100

          bg-orange-50/60

          rounded-xl

          p-4
        "
      >
        <h3
          className="
            text-sm
            sm:text-base

            font-bold

            text-gray-900
          "
        >
          Available Offers
        </h3>

        <div
          className="
            mt-3
            space-y-2.5
          "
        >
          <div
            className="
              flex
              items-start
              gap-2.5
            "
          >
            <FaBolt
              className="
                mt-1

                shrink-0

                text-orange-500

                text-xs
              "
            />

            <p
              className="
                text-xs
                sm:text-sm

                leading-5

                text-gray-700
              "
            >
              Get extra 10% OFF
              on prepaid orders.
            </p>
          </div>

          <div
            className="
              flex
              items-start
              gap-2.5
            "
          >
            <FaBolt
              className="
                mt-1

                shrink-0

                text-orange-500

                text-xs
              "
            />

            <p
              className="
                text-xs
                sm:text-sm

                leading-5

                text-gray-700
              "
            >
              Additional offers may
              apply at checkout.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================
          SIZE
      ====================================== */}

      {Array.isArray(
        product?.sizes
      ) &&
        product.sizes.length >
          0 && (
          <div
            className="
              mt-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                gap-3

                mb-3
              "
            >
              <h3
                className="
                  text-sm
                  sm:text-base

                  font-bold

                  text-gray-900
                "
              >
                Select Size
              </h3>

              <span
                className="
                  text-xs
                  sm:text-sm

                  font-semibold

                  text-[var(--color-primary,#355E3B)]
                "
              >
                Size Guide
              </span>
            </div>

            <SizeSelector
              sizes={
                product.sizes
              }
              selectedSize={
                selectedSize
              }
              setSelectedSize={
                setSelectedSize
              }
            />
          </div>
        )}

      {/* ======================================
          COLOR
      ====================================== */}

      {Array.isArray(
        product?.colors
      ) &&
        product.colors.length >
          0 && (
          <div
            className="
              mt-6
            "
          >
            <h3
              className="
                text-sm
                sm:text-base

                font-bold

                text-gray-900

                mb-3
              "
            >
              Color
            </h3>

            <ColorSelector
              colors={
                product.colors
              }
              selectedColor={
                selectedColor
              }
              setSelectedColor={
                setSelectedColor
              }
            />
          </div>
        )}

      {/* ======================================
          QUANTITY
      ====================================== */}

      {product?.stock > 0 && (
        <div
          className="
            mt-6

            flex
            items-center
            gap-5
          "
        >
          <h3
            className="
              text-sm
              sm:text-base

              font-bold

              text-gray-900
            "
          >
            Quantity
          </h3>

          <QuantitySelector
            quantity={quantity}
            setQuantity={
              setQuantity
            }
          />
        </div>
      )}

      {/* ======================================
          PRODUCT HIGHLIGHTS
      ====================================== */}

      <div
        className="
          mt-6
        "
      >
        <ProductHighlights
          product={product}
        />
      </div>

      {/* ======================================
          DESCRIPTION
      ====================================== */}

      {product?.description && (
        <div
          className="
            mt-5

            border-t
            border-gray-200

            pt-5
          "
        >
          <button
            type="button"
            onClick={() =>
              setDescriptionOpen(
                (prev) => !prev
              )
            }
            className="
              w-full

              flex
              items-center
              justify-between

              gap-4

              text-left
            "
          >
            <h3
              className="
                text-base
                sm:text-lg

                font-bold

                text-gray-900
              "
            >
              Product Description
            </h3>

            {descriptionOpen ? (
              <FaChevronUp
                className="
                  shrink-0
                  text-gray-500
                "
              />
            ) : (
              <FaChevronDown
                className="
                  shrink-0
                  text-gray-500
                "
              />
            )}
          </button>

          {/* Description */}

          <div
            className="
              mt-3
            "
          >
            <p
              className={`
                text-sm
                sm:text-[15px]

                leading-6

                text-gray-600

                ${
                  descriptionOpen
                    ? ""
                    : "truncate"
                }
              `}
            >
              {product.description}
            </p>

            <button
              type="button"
              onClick={() =>
                setDescriptionOpen(
                  (prev) =>
                    !prev
                )
              }
              className="
                mt-2

                text-sm

                font-semibold

                text-[var(--color-primary,#355E3B)]

                hover:underline
              "
            >
              {descriptionOpen
                ? "Show Less"
                : "Read More"}
            </button>
          </div>
        </div>
      )}

      {/* ======================================
          PRODUCT ACTIONS
      ====================================== */}

      <div
        className="
          sticky
          bottom-0
          z-30

          mt-6

          -mx-2
          px-2

          py-3

          bg-white/95
          backdrop-blur

          border-t
          border-gray-200

          lg:bottom-4
          lg:rounded-xl
          lg:border
          lg:px-3

          shadow-[0_-4px_18px_rgba(0,0,0,0.05)]
        "
      >
        <ProductActions
          product={product}
          quantity={quantity}
          selectedSize={
            selectedSize
          }
          selectedColor={
            selectedColor
          }
          onAddToCart={
            handleAddToCart
          }
          disabled={
            product?.stock <= 0
          }
        />
      </div>
    </div>
  );
};

export default ProductInfo;