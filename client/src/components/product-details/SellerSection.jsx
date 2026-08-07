import {
  FaStore,
  FaStar,
  FaBoxOpen,
  FaUsers,
  FaChevronRight,
} from "react-icons/fa";

const SellerSection = ({ product }) => {
  return (
    <section className="mt-14">
      <div
        className="
          bg-white
          border
          border-gray-200
          shadow-sm
          p-6
          sm:p-8
        "
        style={{
          borderRadius:
            "var(--border-radius, 12px)",
        }}
      >
        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <h2 className="text-2xl font-bold mb-8">
          Seller Information
        </h2>

        {/* ====================================== */}
        {/* Seller Card */}
        {/* ====================================== */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
          "
        >
          {/* Left */}

          <div className="flex items-center gap-5">
            {/* Seller Icon */}

            <div
              className="
                w-20
                h-20
                rounded-full
                text-white
                flex
                items-center
                justify-center
                text-3xl
                shrink-0
              "
              style={{
                backgroundColor:
                  "var(--color-primary, #355E3B)",
              }}
            >
              <FaStore />
            </div>

            {/* Seller Details */}

            <div>
              <h3 className="text-2xl font-bold">
                {product?.brand || "Seller"}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <FaStar className="text-yellow-500" />

                <span className="font-semibold">
                  4.8 Seller Rating
                </span>
              </div>

              <p className="text-gray-500 mt-2">
                Trusted Seller Since 2020
              </p>
            </div>
          </div>

          {/* ====================================== */}
          {/* Visit Store Button */}
          {/* ====================================== */}

          <button
            type="button"
            className="
              h-14
              px-8
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-3
              transition-all
              duration-300
              hover:opacity-90
              active:scale-95
            "
            style={{
              backgroundColor:
                "var(--color-button, var(--color-primary, #355E3B))",

              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
            Visit Store

            <FaChevronRight />
          </button>
        </div>

        {/* ====================================== */}
        {/* Statistics */}
        {/* ====================================== */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-5
          "
        >
          {/* Products */}

          <div
            className="
              bg-gray-50
              p-6
              text-center
            "
            style={{
              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
            <FaBoxOpen
              className="
                mx-auto
                text-3xl
                text-[var(--color-primary,#355E3B)]
              "
            />

            <h3 className="mt-4 text-3xl font-black">
              350+
            </h3>

            <p className="text-gray-500 mt-2">
              Products
            </p>
          </div>

          {/* Followers */}

          <div
            className="
              bg-gray-50
              p-6
              text-center
            "
            style={{
              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
            <FaUsers
              className="
                mx-auto
                text-3xl
                text-[var(--color-primary,#355E3B)]
              "
            />

            <h3 className="mt-4 text-3xl font-black">
              12.5K
            </h3>

            <p className="text-gray-500 mt-2">
              Followers
            </p>
          </div>

          {/* Rating */}

          <div
            className="
              bg-gray-50
              p-6
              text-center
            "
            style={{
              borderRadius:
                "var(--border-radius, 12px)",
            }}
          >
            <FaStar
              className="
                mx-auto
                text-3xl
                text-[var(--color-primary,#355E3B)]
              "
            />

            <h3 className="mt-4 text-3xl font-black">
              4.8
            </h3>

            <p className="text-gray-500 mt-2">
              Average Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerSection;