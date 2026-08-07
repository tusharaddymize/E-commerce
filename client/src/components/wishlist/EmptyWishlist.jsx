import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const EmptyWishlist = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div
        className="
          bg-white
          shadow-lg
          border
          max-w-lg
          w-full
          p-8
          sm:p-10
          text-center
        "
        style={{
          borderRadius: "var(--border-radius, 24px)",
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
          <FaHeart
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
          Your Wishlist is Empty
        </h2>

        {/* ==========================
            Description
        ========================== */}

        <p className="text-gray-500 mt-4 leading-7">
          Save your favourite products here and shop them anytime.
        </p>

        {/* ==========================
            Button
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
          Explore Products
        </Link>
      </div>
    </section>
  );
};

export default EmptyWishlist;