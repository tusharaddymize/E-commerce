import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

const EmptyOrders = () => {
  return (
    <section
      className="
        w-full

        flex
        items-center
        justify-center

        px-3
        sm:px-5

        py-8
        sm:py-12
        lg:py-16
      "
    >
      <div
        className="
          w-full
          max-w-md

          bg-white

          text-center

          px-5
          sm:px-8

          py-8
          sm:py-10
        "
      >
        {/* ====================================== */}
        {/* Icon */}
        {/* ====================================== */}

        <div
          className="
            w-20
            h-20

            sm:w-24
            sm:h-24

            mx-auto

            rounded-full

            flex
            items-center
            justify-center

            bg-[var(--primary-color,#355E3B)]/10
          "
        >
          <FaBoxOpen
            className="
              text-3xl
              sm:text-4xl

              text-[var(--primary-color,#355E3B)]
            "
          />
        </div>

        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <h2
          className="
            mt-6

            text-2xl
            sm:text-3xl

            font-bold
            text-gray-900
          "
        >
          No Orders Yet
        </h2>

        {/* ====================================== */}
        {/* Description */}
        {/* ====================================== */}

        <p
          className="
            mt-3

            max-w-sm
            mx-auto

            text-sm
            sm:text-base

            leading-6
            sm:leading-7

            text-gray-500
          "
        >
          You haven't placed any orders
          yet. Start shopping and your
          orders will appear here.
        </p>

        {/* ====================================== */}
        {/* Start Shopping */}
        {/* ====================================== */}

        <Link
          to="/"
          className="
            mt-7

            w-full
            sm:w-auto

            min-h-11

            inline-flex
            items-center
            justify-center
            gap-2

            px-6

            rounded-xl

            bg-[var(--primary-color,#355E3B)]

            text-white
            text-sm
            sm:text-base
            font-semibold

            transition-all
            duration-200

            hover:opacity-90
            hover:shadow-md
          "
        >
          Start Shopping

          <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  );
};

export default EmptyOrders;