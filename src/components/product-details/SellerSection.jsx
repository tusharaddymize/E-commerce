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

      <div className="bg-white rounded-3xl border shadow-sm p-6 sm:p-8">

        {/* Heading */}

        <h2 className="text-2xl font-bold mb-8">
          Seller Information
        </h2>

        {/* Seller Card */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* Left */}

          <div className="flex items-center gap-5">

            <div
              className="
              w-20
              h-20
              rounded-full
              bg-[#355E3B]
              text-white
              flex
              items-center
              justify-center
              text-3xl
              "
            >
              <FaStore />
            </div>

            <div>

              <h3 className="text-2xl font-bold">
                {product.brand}
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

          {/* Visit Store */}

          <button
            className="
            h-14
            px-8
            rounded-2xl
            bg-[#355E3B]
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            hover:bg-[#27452d]
            transition
            "
          >
            Visit Store

            <FaChevronRight />
          </button>

        </div>

        {/* Statistics */}

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

          <div className="bg-gray-50 rounded-2xl p-6 text-center">

            <FaBoxOpen className="mx-auto text-3xl text-[#355E3B]" />

            <h3 className="mt-4 text-3xl font-black">
              350+
            </h3>

            <p className="text-gray-500 mt-2">
              Products
            </p>

          </div>

          {/* Followers */}

          <div className="bg-gray-50 rounded-2xl p-6 text-center">

            <FaUsers className="mx-auto text-3xl text-[#355E3B]" />

            <h3 className="mt-4 text-3xl font-black">
              12.5K
            </h3>

            <p className="text-gray-500 mt-2">
              Followers
            </p>

          </div>

          {/* Rating */}

          <div className="bg-gray-50 rounded-2xl p-6 text-center">

            <FaStar className="mx-auto text-3xl text-[#355E3B]" />

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