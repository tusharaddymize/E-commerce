import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="bg-white rounded-3xl shadow-lg border max-w-lg w-full p-10 text-center">

        {/* Icon */}
        <div className="w-28 h-28 mx-auto rounded-full bg-[#355E3B]/10 flex items-center justify-center">
          <FaShoppingCart className="text-5xl text-[#355E3B]" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-black mt-8">
          Your Cart is Empty
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4 leading-7">
          Looks like you haven't added anything to your cart yet.
          Browse our latest collection and find something you'll love.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="
            inline-flex
            items-center
            justify-center
            mt-10
            w-full
            h-14
            rounded-2xl
            bg-[#355E3B]
            text-white
            font-semibold
            text-lg
            hover:bg-[#27452d]
            transition
          "
        >
          Continue Shopping
        </Link>

      </div>
    </section>
  );
};

export default EmptyCart;