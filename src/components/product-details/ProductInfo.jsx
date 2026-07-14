// import {
//   FaStar,
//   FaTruck,
//   FaUndoAlt,
//   FaCheckCircle,
//   FaShieldAlt,
//   FaBolt,
// } from "react-icons/fa";

// import ColorSelector from "./ColorSelector";
// import SizeSelector from "./SizeSelector";
// import QuantitySelector from "./QuantitySelector";
// import ProductActions from "./ProductActions";

// const ProductInfo = ({ product }) => {
//   return (
//     <div className="w-full">

//       {/* Brand */}

//       <span
//         className="
//         inline-flex
//         items-center
//         bg-[#355E3B]
//         text-white
//         px-4
//         py-2
//         rounded-full
//         text-sm
//         font-semibold
//         "
//       >
//         {product.brand}
//       </span>

//       {/* Product Title */}

//       <h1
//         className="
//         mt-5
//         text-3xl
//         lg:text-4xl
//         font-bold
//         leading-snug
//         text-gray-900
//         "
//       >
//         {product.title}
//       </h1>

//       {/* Rating */}

//       <div
//         className="
//         flex
//         flex-wrap
//         items-center
//         gap-4
//         mt-6
//         "
//       >

//         <div
//           className="
//           flex
//           items-center
//           gap-2
//           bg-[#355E3B]
//           text-white
//           px-4
//           py-2
//           rounded-full
//           "
//         >

//           <FaStar className="text-yellow-300" />

//           <span className="font-semibold">
//             {product.rating}
//           </span>

//         </div>

//         <span className="text-gray-500">

//           {product.totalReviews} Reviews

//         </span>

//         <span className="text-gray-300">

//           |

//         </span>

//         <span className="font-semibold text-[#355E3B]">

//           {product.sold}+ Sold

//         </span>

//       </div>

//       {/* Price */}

//       <div
//         className="
//         mt-8
//         flex
//         flex-wrap
//         items-end
//         gap-4
//         "
//       >

//         <span
//           className="
//           text-5xl
//           font-black
//           text-[#355E3B]
//           "
//         >
//           ₹{product.price}
//         </span>

//         <span
//           className="
//           text-2xl
//           text-gray-400
//           line-through
//           "
//         >
//           ₹{product.oldPrice}
//         </span>

//         <span
//           className="
//           bg-red-500
//           text-white
//           px-3
//           py-1
//           rounded-full
//           font-semibold
//           "
//         >
//           {product.discount}% OFF
//         </span>

//       </div>

//       {/* Stock */}

//       <div
//         className="
//         mt-6
//         flex
//         items-center
//         gap-3
//         "
//       >

//         <FaCheckCircle
//           className="text-green-600 text-xl"
//         />

//         <span
//           className="
//           font-semibold
//           text-green-700
//           "
//         >
//           {product.stock
//             ? "In Stock"
//             : "Out of Stock"}
//         </span>

//       </div>

//       {/* Offers */}

//       <div
//         className="
//         mt-8
//         bg-orange-50
//         border
//         border-orange-200
//         rounded-2xl
//         p-5
//         space-y-3
//         "
//       >

//         <h3 className="font-bold text-lg">

//           Available Offers

//         </h3>

//         <div className="flex gap-3">

//           <FaBolt className="text-orange-500 mt-1" />

//           <p className="text-gray-700">

//             Get extra 10% OFF on prepaid orders.

//           </p>

//         </div>

//         <div className="flex gap-3">

//           <FaBolt className="text-orange-500 mt-1" />

//           <p className="text-gray-700">

//             Free delivery on orders above ₹999.

//           </p>

//         </div>

//         <div className="flex gap-3">

//           <FaBolt className="text-orange-500 mt-1" />

//           <p className="text-gray-700">

//             Buy 2 products & get 5% instant discount.

//           </p>

//         </div>

//       </div>
//             {/* Description */}

//       <div className="mt-10">

//         <h3 className="text-xl font-bold mb-4">

//           Product Description

//         </h3>

//         <p
//           className="
//           text-gray-600
//           leading-8
//           text-[15px]
//           "
//         >
//           {product.description}
//         </p>

//       </div>

//       {/* Size */}

//       <div className="mt-10">

//         <div className="flex items-center justify-between mb-4">

//           <h3 className="font-bold text-lg">

//             Select Size

//           </h3>

//           <span className="text-sm text-[#355E3B] font-semibold">

//             Size Guide

//           </span>

//         </div>

//         <SizeSelector
//           sizes={product.sizes}
//         />

//       </div>

//       {/* Color */}

//       <div className="mt-10">

//         <h3 className="font-bold text-lg mb-4">

//           Select Color

//         </h3>

//         <ColorSelector
//           colors={product.colors}
//         />

//       </div>

//       {/* Quantity */}

//       <div className="mt-10">

//         <h3 className="font-bold text-lg mb-4">

//           Quantity

//         </h3>

//         <QuantitySelector />

//       </div>

//       {/* Product Features */}

//       <div
//         className="
//         mt-10
//         grid
//         grid-cols-2
//         gap-4
//         "
//       >

//         <div
//           className="
//           bg-white
//           border
//           rounded-2xl
//           p-5
//           text-center
//           "
//         >

//           <h4 className="font-bold text-[#355E3B]">

//             Fabric

//           </h4>

//           <p className="text-gray-500 mt-2">

//             {product.fabric}

//           </p>

//         </div>

//         <div
//           className="
//           bg-white
//           border
//           rounded-2xl
//           p-5
//           text-center
//           "
//         >

//           <h4 className="font-bold text-[#355E3B]">

//             Pattern

//           </h4>

//           <p className="text-gray-500 mt-2">

//             {product.pattern}

//           </p>

//         </div>

//         <div
//           className="
//           bg-white
//           border
//           rounded-2xl
//           p-5
//           text-center
//           "
//         >

//           <h4 className="font-bold text-[#355E3B]">

//             Occasion

//           </h4>

//           <p className="text-gray-500 mt-2">

//             {product.occasion}

//           </p>

//         </div>

//         <div
//           className="
//           bg-white
//           border
//           rounded-2xl
//           p-5
//           text-center
//           "
//         >

//           <h4 className="font-bold text-[#355E3B]">

//             Country

//           </h4>

//           <p className="text-gray-500 mt-2">

//             {product.country}

//           </p>

//         </div>

//       </div>
//             {/* Product Actions */}

//       <ProductActions
//         product={product}
//       />

//       {/* Services */}

//       <div
//         className="
//         mt-10
//         border
//         rounded-3xl
//         bg-white
//         p-6
//         space-y-6
//         shadow-sm
//         "
//       >

//         {/* Free Delivery */}

//         <div className="flex gap-4">

//           <div
//             className="
//             w-12
//             h-12
//             rounded-full
//             bg-green-100
//             flex
//             items-center
//             justify-center
//             "
//           >

//             <FaTruck className="text-[#355E3B] text-xl" />

//           </div>

//           <div>

//             <h4 className="font-bold">

//               Free Delivery

//             </h4>

//             <p className="text-gray-500 text-sm mt-1">

//               Delivery within 2–5 business days.

//             </p>

//           </div>

//         </div>

//         {/* Easy Return */}

//         <div className="flex gap-4">

//           <div
//             className="
//             w-12
//             h-12
//             rounded-full
//             bg-orange-100
//             flex
//             items-center
//             justify-center
//             "
//           >

//             <FaUndoAlt className="text-orange-500 text-xl" />

//           </div>

//           <div>

//             <h4 className="font-bold">

//               Easy Returns

//             </h4>

//             <p className="text-gray-500 text-sm mt-1">

//               7 Days hassle-free return policy.

//             </p>

//           </div>

//         </div>

//         {/* Secure Payment */}

//         <div className="flex gap-4">

//           <div
//             className="
//             w-12
//             h-12
//             rounded-full
//             bg-blue-100
//             flex
//             items-center
//             justify-center
//             "
//           >

//             <FaShieldAlt className="text-blue-600 text-xl" />

//           </div>

//           <div>

//             <h4 className="font-bold">

//               Secure Payments

//             </h4>

//             <p className="text-gray-500 text-sm mt-1">

//               100% secure payment with UPI, Cards & Net Banking.

//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductInfo;



import { useState } from "react";

import {
  FaStar,
  FaTruck,
  FaUndoAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";


const ProductInfo = ({ product }) => {

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || ""
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );

  const [quantity, setQuantity] = useState(1);

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
<h1
  className="
  mt-5
  text-3xl
  lg:text-4xl
  font-bold
  leading-snug
  "
>
  {product.title}
</h1>
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

    {product.rating}

  </div>

  <span className="text-gray-500">

    {product.totalReviews} Reviews

  </span>

  <span className="text-[#355E3B] font-semibold">

    {product.sold}+ Sold

  </span>

</div>
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
    ₹{product.price}
  </h2>

  <span
    className="
    line-through
    text-2xl
    text-gray-400
    "
  >
    ₹{product.oldPrice}
  </span>

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

</div>
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

  {product.stock
    ? "In Stock"
    : "Out Of Stock"}

</div>
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
          sizes={product.sizes}
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
          colors={product.colors}
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

            {product.fabric}

          </p>

        </div>

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Pattern

          </h4>

          <p className="mt-2 text-gray-500">

            {product.pattern}

          </p>

        </div>

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Occasion

          </h4>

          <p className="mt-2 text-gray-500">

            {product.occasion}

          </p>

        </div>

        <div className="bg-white border rounded-2xl p-5">

          <h4 className="font-bold text-[#355E3B]">

            Country

          </h4>

          <p className="mt-2 text-gray-500">

            {product.country}

          </p>

        </div>

      </div>
            {/* Product Actions */}

<ProductActions
  onAddToCart={handleAddToCart}
/>
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

        {/* Easy Return */}

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

        {/* Secure Payment */}

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