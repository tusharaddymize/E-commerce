import {
  FiTrash2,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {

  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (

    <motion.div

      layout

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        scale: .95,
      }}

      transition={{
        duration: .35,
      }}

      className="
      bg-white
      rounded-3xl
      shadow-md
      hover:shadow-xl
      transition
      p-6
      "

    >

      <div
        className="
        flex
        flex-col
        md:flex-row
        gap-6
        "
      >

        {/* Image */}

        <div
          className="
          w-full
          md:w-44
          h-72
          md:h-44
          rounded-2xl
          overflow-hidden
          bg-gray-100
          flex-shrink-0
          "
        >

          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

        </div>

        {/* Content */}

        <div className="flex-1">

          <div className="flex justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                {item.title}

              </h2>

              <p className="text-gray-500 mt-2">

                Brand :
                <span className="font-semibold ml-2">
                  {item.brand}
                </span>

              </p>

              {/* Selected Size */}

              <div className="mt-3">

                <span className="text-sm text-gray-500">

                  Size :

                </span>

                <span
                  className="
                  ml-2
                  px-3
                  py-1
                  rounded-full
                  bg-gray-100
                  font-semibold
                  "
                >

                  {item.selectedSize || "-"}

                </span>

              </div>

              {/* Selected Color */}

              <div className="mt-3 flex items-center">

                <span className="text-sm text-gray-500">

                  Color :

                </span>

                <div
                  className="ml-3 w-6 h-6 rounded-full border"
                  style={{
                    background: item.selectedColor,
                  }}
                />

              </div>

            </div>

            {/* Delete */}

            <button

              onClick={() =>
                removeFromCart(
                  item.id,
                  item.selectedSize,
                  item.selectedColor
                )
              }

              className="
              w-11
              h-11
              rounded-full
              bg-red-50
              hover:bg-red-500
              hover:text-white
              transition
              flex
              items-center
              justify-center
              "

            >

              <FiTrash2 />

            </button>

          </div>
                    {/* Price */}

          <div className="mt-6 flex items-center gap-4">

            <span className="text-3xl font-black text-[#355E3B]">
              ₹{item.price}
            </span>

            {item.oldPrice && (
              <span className="text-xl line-through text-gray-400">
                ₹{item.oldPrice}
              </span>
            )}

          </div>

          {/* Bottom */}

          <div
            className="
            mt-8
            flex
            flex-col
            md:flex-row
            md:items-center
            justify-between
            gap-5
            "
          >

            {/* Quantity */}

            <div
              className="
              flex
              items-center
              border
              rounded-xl
              overflow-hidden
              "
            >

              <button
                onClick={() =>
                  decreaseQuantity(
                    item.id,
                    item.selectedSize,
                    item.selectedColor
                  )
                }
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <FiMinus />
              </button>

              <span className="w-14 text-center font-bold text-lg">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(
                    item.id,
                    item.selectedSize,
                    item.selectedColor
                  )
                }
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <FiPlus />
              </button>

            </div>

            {/* Total */}

            <div className="text-right">

              <p className="text-gray-500">
                Total
              </p>

              <h3 className="text-3xl font-black text-[#355E3B]">

                ₹{item.price * item.quantity}

              </h3>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );

};

export default CartItem;