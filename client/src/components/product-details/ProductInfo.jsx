import { useState } from "react";

import {
  FaStar,
  FaTruck,
  FaUndoAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product }) => {

  const { addToCart } = useCart();

  const {
    addWishlist,
    removeWishlist,
    isInWishlist,
  } = useWishlist();

  const productId =
    product._id || product.id;

  const liked =
    isInWishlist(productId);

  const [selectedSize, setSelectedSize] =
    useState(
      product.sizes?.[0] || ""
    );

  const [selectedColor, setSelectedColor] =
    useState(
      product.colors?.[0] || ""
    );

  const [quantity, setQuantity] =
    useState(1);

  const handleAddToCart = () => {

    addToCart({

      ...product,

      quantity,

      selectedSize,

      selectedColor,

    });

  };

  return (

    <div className="w-full">

      {/* Brand */}

      <span
        className="
        inline-flex
        items-center
        bg-[#355E3B]
        text-white
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold
        "
      >
        {product.brand}
      </span>

      {/* Wishlist + Share */}

      <div className="flex items-center gap-3 mt-5">

        <button
          onClick={() => {

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
          w-11
          h-11
          rounded-full
          border
          flex
          items-center
          justify-center
          hover:bg-red-50
          transition
          "
        >

          {liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}

        </button>

        <button
          onClick={() => {

            if (navigator.share) {

              navigator.share({

                title: product.title,

                text: product.description,

                url: window.location.href,

              });

            }

          }}
          className="
          w-11
          h-11
          rounded-full
          border
          flex
          items-center
          justify-center
          hover:bg-gray-100
          transition
          "
        >

          <FaShareAlt />

        </button>

      </div>

      {/* Title */}

      <h1
        className="
        mt-6
        text-3xl
        lg:text-4xl
        font-bold
        leading-snug
        "
      >
        {product.title}
      </h1>

      {/* Rating */}

      <div
        className="
        flex
        items-center
        gap-4
        mt-5
        flex-wrap
        "
      >

        <div
          className="
          flex
          items-center
          gap-2
          bg-[#355E3B]
          text-white
          px-3
          py-1
          rounded-full
          "
        >

          <FaStar />

          {(product.rating || 0).toFixed(1)}

        </div>

        <span className="text-gray-500">

          {product.totalReviews || 0}
          {" "}Reviews

        </span>

        <span className="text-[#355E3B] font-semibold">

          {product.sold || 0}+ Sold

        </span>

      </div>

      {/* Price */}

      <div
        className="
        flex
        items-end
        gap-4
        mt-8
        flex-wrap
        "
      >

        <h2
          className="
          text-5xl
          font-black
          text-[#355E3B]
          "
        >

          ₹
          {Number(
            product.price || 0
          ).toLocaleString("en-IN")}

        </h2>

        {product.oldPrice > 0 && (

          <span
            className="
            line-through
            text-2xl
            text-gray-400
            "
          >

            ₹
            {Number(
              product.oldPrice
            ).toLocaleString("en-IN")}

          </span>

        )}

        {product.discount > 0 && (

          <span
            className="
            bg-red-500
            text-white
            px-3
            py-1
            rounded-full
            font-semibold
            "
          >

            {product.discount}% OFF

          </span>

        )}

      </div>

      {/* Stock */}

      <div
        className="
        mt-6
        flex
        items-center
        gap-3
        text-green-600
        font-semibold
        "
      >

        <FaCheckCircle />

        {product.stock > 0
          ? "In Stock"
          : "Out Of Stock"}

      </div>

      {/* Available Offers */}

      <div
        className="
        mt-8
        bg-orange-50
        border
        border-orange-200
        rounded-2xl
        p-5
        space-y-3
        "
      >
                <h3 className="font-bold">

          Available Offers

        </h3>

        <div className="flex gap-3">

          <FaBolt className="text-orange-500 mt-1" />

          <p>

            Get extra 10% OFF on prepaid orders.

          </p>

        </div>

        <div className="flex gap-3">

          <FaBolt className="text-orange-500 mt-1" />

          <p>

            Free delivery on orders above ₹999.

          </p>

        </div>

      </div>

      {/* Description */}

      <div className="mt-10">

        <h3 className="text-xl font-bold mb-4">

          Product Description

        </h3>

        <p
          className="
          text-gray-600
          leading-8
          text-[15px]
          "
        >
          {product.description}
        </p>

      </div>

      {/* Size */}

      <div className="mt-10">

        <div className="flex justify-between items-center mb-4">

          <h3 className="font-bold text-lg">

            Select Size

          </h3>

          <span className="text-sm text-[#355E3B] font-semibold">

            Size Guide

          </span>

        </div>

        <SizeSelector
          sizes={product.sizes || []}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

      </div>

      {/* Color */}

      <div className="mt-10">

        <h3 className="font-bold text-lg mb-4">

          Select Color

        </h3>

        <ColorSelector
          colors={product.colors || []}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

      </div>

      {/* Quantity */}

      <div className="mt-10">

        <h3 className="font-bold text-lg mb-4">

          Quantity

        </h3>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      {/* Product Features */}

      <div
        className="
        mt-10
        grid
        grid-cols-2
        gap-4
        "
      >

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Fabric

          </h4>

          <p className="mt-2 text-gray-500">

            {product.fabric || "N/A"}

          </p>

        </div>

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Pattern

          </h4>

          <p className="mt-2 text-gray-500">

            {product.pattern || "N/A"}

          </p>

        </div>

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Occasion

          </h4>

          <p className="mt-2 text-gray-500">

            {product.occasion || "N/A"}

          </p>

        </div>

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Country

          </h4>

          <p className="mt-2 text-gray-500">

            {product.country || "India"}

          </p>

        </div>

      </div>
            {/* Delivery Checker */}

      <div
        className="
        mt-10
        border
        rounded-3xl
        p-6
        bg-white
        "
      >

        <h3 className="font-bold text-lg">

          Delivery

        </h3>

        <div className="flex gap-3 mt-4">

          <input
            type="text"
            placeholder="Enter Pincode"
            className="
            flex-1
            border
            rounded-xl
            px-4
            h-12
            outline-none
            "
          />

          <button
            className="
            px-6
            rounded-xl
            bg-[#355E3B]
            text-white
            hover:bg-[#27452d]
            transition
            "
          >

            Check

          </button>

        </div>

        <p className="mt-4 text-green-600">

          🚚 Delivery in 2-5 Business Days

        </p>

      </div>

      {/* Sticky Product Actions */}

      <div
        className="
        sticky
        bottom-5
        z-20
        bg-white
        pt-6
        "
      >

        <ProductActions
          onAddToCart={handleAddToCart}
        />

      </div>

      {/* Services */}

      <div
        className="
        mt-10
        border
        rounded-3xl
        bg-white
        p-6
        space-y-6
        shadow-sm
        "
      >

        {/* Free Delivery */}

        <div className="flex gap-4">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            "
          >

            <FaTruck className="text-[#355E3B] text-xl" />

          </div>

          <div>

            <h4 className="font-bold">

              Free Delivery

            </h4>

            <p className="text-gray-500 text-sm mt-1">

              Delivery within 2–5 business days.

            </p>

          </div>

        </div>

        {/* Easy Returns */}

        <div className="flex gap-4">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-orange-100
            flex
            items-center
            justify-center
            "
          >

            <FaUndoAlt className="text-orange-500 text-xl" />

          </div>

          <div>

            <h4 className="font-bold">

              Easy Returns

            </h4>

            <p className="text-gray-500 text-sm mt-1">

              7 Days hassle-free return policy.

            </p>

          </div>

        </div>

        {/* Secure Payments */}

        <div className="flex gap-4">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
            "
          >

            <FaShieldAlt className="text-blue-600 text-xl" />

          </div>

          <div>

            <h4 className="font-bold">

              Secure Payments

            </h4>

            <p className="text-gray-500 text-sm mt-1">

              100% Secure payment via UPI, Cards & Net Banking.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductInfo;