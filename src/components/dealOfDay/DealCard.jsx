import { motion } from "framer-motion";
import { FaStar, FaShippingFast, FaShieldAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { dealProduct } from "./dealData";

const DealCard = () => {
  const soldPercentage =
    (dealProduct.sold / (dealProduct.stock + dealProduct.sold)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-2 gap-10 items-center"
    >
      {/* Product Image */}
   <div className="relative rounded-[35px] overflow-hidden shadow-2xl">
  {/* Discount Badge */}
  <span className="absolute top-6 left-6 z-10 bg-red-500 text-white px-5 py-2 rounded-full font-semibold">
    -{dealProduct.discount}
  </span>

  <img
    src={dealProduct.image}
    alt={dealProduct.title}
    className="w-full h-full object-cover"
  />
</div>

      {/* Product Details */}
      <div className="text-white">

        <p className="uppercase tracking-[4px] text-green-200">
          Limited Time Offer
        </p>

        <h2 className="text-5xl font-bold mt-3">
          {dealProduct.title}
        </h2>

        <div className="flex items-center gap-2 mt-5">
          <FaStar className="text-yellow-400" />
          <span>{dealProduct.rating}</span>
        </div>

        <p className="mt-6 text-white/80 text-lg leading-8">
          {dealProduct.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-5 mt-8">

          <span className="text-5xl font-bold">
            ₹{dealProduct.price}
          </span>

          <span className="line-through text-2xl text-gray-300">
            ₹{dealProduct.oldPrice}
          </span>

        </div>

        {/* Stock */}
        <div className="mt-8">

          <div className="flex justify-between text-sm mb-2">
            <span>Available : {dealProduct.stock}</span>
            <span>Sold : {dealProduct.sold}</span>
          </div>

          <div className="h-3 rounded-full bg-white/20 overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${soldPercentage}%` }}
              transition={{ duration: 1.2 }}
              className="h-full bg-green-400"
            />

          </div>

        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="flex items-center gap-3">
            <FaShippingFast />
            Free Shipping
          </div>

          <div className="flex items-center gap-3">
            <FaShieldAlt />
            Secure Payment
          </div>

          <div className="flex items-center gap-3">
            ✓ Easy Returns
          </div>

          <div className="flex items-center gap-3">
            ✓ 1 Year Warranty
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-5 mt-10">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .96 }}
            className="flex-1 h-14 rounded-full bg-white text-[#355E3B] font-bold"
          >
            Buy Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .96 }}
            className="flex-1 h-14 rounded-full bg-[#355E3B] border border-white flex justify-center items-center gap-3"
          >
            <FiShoppingCart />
            Add To Cart
          </motion.button>

        </div>

      </div>

    </motion.div>
  );
};

export default DealCard;