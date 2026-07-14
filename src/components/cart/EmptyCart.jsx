import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const EmptyCart = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
      min-h-[70vh]
      flex
      items-center
      justify-center
      px-4
      sm:px-6
      lg:px-8
      "
    >
      <div
        className="
        w-full
        max-w-2xl
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        sm:p-10
        lg:p-14
        text-center
        "
      >
        {/* Icon */}

        <div
          className="
          mx-auto
          w-28
          h-28
          sm:w-32
          sm:h-32
          rounded-full
          bg-[#355E3B]/10
          flex
          items-center
          justify-center
          "
        >
          <FiShoppingCart className="text-6xl text-[#355E3B]" />
        </div>

        {/* Heading */}

        <h1
          className="
          mt-8
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-black
          "
        >
          Your Cart is Empty
        </h1>

        {/* Description */}

        <p
          className="
          mt-5
          text-gray-600
          leading-8
          max-w-xl
          mx-auto
          "
        >
          Looks like you haven't added any products yet.
          Explore our latest collection and start shopping.
        </p>

        {/* Button */}

        <Link
          to="/"
          className="
          inline-flex
          items-center
          gap-3

          mt-10

          px-8

          h-14

          rounded-2xl

          bg-[#355E3B]

          text-white

          font-semibold

          hover:bg-[#27452d]

          transition
          "
        >
          <FiArrowLeft />

          Continue Shopping
        </Link>

        {/* Features */}

        <div
          className="
          mt-12

          grid

          grid-cols-1

          sm:grid-cols-3

          gap-5
          "
        >
          <div className="rounded-2xl bg-gray-50 p-5">

            <h4 className="font-bold">
              🚚 Free Delivery
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              On eligible orders
            </p>

          </div>

          <div className="rounded-2xl bg-gray-50 p-5">

            <h4 className="font-bold">
              🔒 Secure Payment
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              100% safe checkout
            </p>

          </div>

          <div className="rounded-2xl bg-gray-50 p-5">

            <h4 className="font-bold">
              ↩ Easy Returns
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              7 days return policy
            </p>

          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default EmptyCart;