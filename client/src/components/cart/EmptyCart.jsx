import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <section
      className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        px-5
        py-16
      "
    >
      <div
        className="
          bg-white
          shadow-lg
          border
          border-gray-200
          max-w-lg
          w-full
          p-8
          sm:p-10
          text-center
        "
        style={{
          borderRadius: "var(--border-radius, 16px)",
        }}
      >
        {/* ==========================
            Icon
        ========================== */}

        <div
          className="
            w-28
            h-28
            mx-auto
            rounded-full
            flex
            items-center
            justify-center
          "
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary-color, #355E3B) 15%, white)",
          }}
        >
          <FaShoppingCart
            className="text-5xl"
            style={{
              color: "var(--primary-color, #355E3B)",
            }}
          />
        </div>

        {/* ==========================
            Heading
        ========================== */}

        <h2 className="text-3xl sm:text-4xl font-black mt-8">
          Your Cart is Empty
        </h2>

        {/* ==========================
            Description
        ========================== */}

        <p className="text-gray-500 mt-4 leading-7">
          Looks like you haven't added anything to your cart yet.
          Browse our latest collection and find something you'll
          love.
        </p>

        {/* ==========================
            Continue Shopping
        ========================== */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            justify-center

            mt-10

            w-full
            h-14

            text-white
            text-lg
            font-semibold

            transition-all
            duration-300

            hover:opacity-90
            hover:-translate-y-0.5
          "
          style={{
            backgroundColor:
              "var(--primary-color, #355E3B)",
            borderRadius:
              "var(--border-radius, 16px)",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default EmptyCart;