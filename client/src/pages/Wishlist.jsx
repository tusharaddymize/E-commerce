import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiHeart,
} from "react-icons/fi";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import EmptyWishlist from "../components/wishlist/EmptyWishlist";

const Wishlist = () => {
  const {
    wishlist,
    removeWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const navigate = useNavigate();

  return (
    <main
      className="
        min-h-screen
        bg-[#f7f8f7]

        py-5
        sm:py-7
        lg:py-10
      "
    >
      <div
        className="
          w-full
          max-w-[1450px]

          mx-auto

          px-3
          sm:px-5
          lg:px-8
        "
      >
        {/* ====================================== */}
        {/* Back To Shopping */}
        {/* ====================================== */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2

            mb-5
            sm:mb-6

            px-3
            sm:px-4
            py-2

            bg-white

            border
            border-gray-200

            rounded-xl

            text-sm
            font-semibold
            text-gray-700

            shadow-sm

            transition-all
            duration-200

            hover:border-[var(--primary-color,#355E3B)]
            hover:text-[var(--primary-color,#355E3B)]
            hover:shadow
          "
        >
          <FiArrowLeft size={17} />

          Back to Shopping
        </Link>

        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            gap-3

            mb-6
            sm:mb-8
          "
        >
          <div
            className="
              w-10
              h-10

              sm:w-12
              sm:h-12

              rounded-xl

              flex
              items-center
              justify-center

              bg-[var(--primary-color,#355E3B)]/10
              text-[var(--primary-color,#355E3B)]
            "
          >
            <FiHeart
              size={22}
            />
          </div>

          <div>
            <h1
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl

                font-bold
                text-gray-900
              "
            >
              My Wishlist
            </h1>

            <p
              className="
                mt-1

                text-xs
                sm:text-sm

                text-gray-500
              "
            >
              Your saved products
            </p>
          </div>
        </div>

        {/* ====================================== */}
        {/* Empty Wishlist */}
        {/* ====================================== */}

        {wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          /* ==================================== */
          /* Wishlist Products */
          /* ==================================== */

          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4

              gap-4
              sm:gap-5
              lg:gap-6
            "
          >
            {wishlist.map(
              (product) => (
                <div
                  key={product.id}
                  className="
                    bg-white

                    border
                    border-gray-200

                    rounded-2xl

                    shadow-sm

                    overflow-hidden

                    transition-all
                    duration-300

                    hover:shadow-lg
                    hover:-translate-y-1
                  "
                >
                  {/* ============================ */}
                  {/* Product Image */}
                  {/* ============================ */}

                  <div
                    className="
                      w-full

                      h-64
                      sm:h-72
                      lg:h-80

                      bg-gray-100

                      overflow-hidden
                    "
                  >
                    <img
                     src={
    product.image ||
    product.images?.[0]?.url ||
    product.images?.[0] ||
    "/placeholder.png"
  }
                      className="
                        w-full
                        h-full

                        object-cover

                        transition-transform
                        duration-300

                        hover:scale-105
                      "
                    />
                  </div>

                  {/* ============================ */}
                  {/* Product Content */}
                  {/* ============================ */}

                  <div
                    className="
                      p-4
                      sm:p-5
                    "
                  >
                    <h3
                      className="
                        text-base
                        sm:text-lg

                        font-semibold
                        text-gray-900

                        line-clamp-2
                      "
                    >
                      {product.title}
                    </h3>

                    <p
                      className="
                        mt-2

                        text-xl
                        sm:text-2xl

                        font-bold

                        text-[var(--primary-color,#355E3B)]
                      "
                    >
                      ₹
                      {Number(
                        product.price ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* ========================== */}
                    {/* Actions */}
                    {/* ========================== */}

                    <div
                      className="
                        grid
                        grid-cols-2

                        gap-2
                        sm:gap-3

                        mt-5
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          removeWishlist(
                            product.id
                          )
                        }
                        className="
                          min-h-11

                          px-3

                          rounded-xl

                          border
                          border-red-200

                          bg-red-50

                          text-red-600
                          text-sm
                          font-semibold

                          transition

                          hover:bg-red-500
                          hover:text-white
                        "
                      >
                        Remove
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          addToCart(
                            product
                          );

                          removeWishlist(
                            product.id
                          );

                          navigate(
                            "/cart"
                          );
                        }}
                        className="
                          min-h-11

                          px-3

                          rounded-xl

                          bg-[var(--primary-color,#355E3B)]

                          text-white
                          text-sm
                          font-semibold

                          transition

                          hover:opacity-90
                        "
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;