import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiClock,
  FiZap,
} from "react-icons/fi";

import ProductCard from "../components/product-card/ProductCard";

import {
  getFlashDeal,
} from "../services/flashDealService";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
// ==========================================
// Flash Deals Page
// ==========================================

const FlashDeals = () => {
  const [flashDeal, setFlashDeal] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [timeLeft, setTimeLeft] =
    useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  // ==========================================
  // Fetch Active Flash Deal
  // ==========================================

  useEffect(() => {
    const fetchFlashDeal = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getFlashDeal();

        if (
          response?.success &&
          response?.flashDeal
        ) {
          setFlashDeal(
            response.flashDeal
          );
        } else {
          setError(
            "No active sale available."
          );
        }
      } catch (error) {
        console.error(
          "Flash Deals Page Error:",
          error
        );

        setError(
          error?.response?.data
            ?.message ||
            "Unable to load flash deal."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFlashDeal();
  }, []);

  // ==========================================
  // Countdown Timer
  // ==========================================

  useEffect(() => {
    if (!flashDeal?.endDate) return;

    const updateCountdown = () => {
      const endTime = new Date(
        flashDeal.endDate
      ).getTime();

      const now = Date.now();

      const distance =
        endTime - now;

      // ======================================
      // Sale Ended
      // ======================================

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(
          distance /
            (1000 *
              60 *
              60 *
              24)
        ),

        hours: Math.floor(
          (distance %
            (1000 *
              60 *
              60 *
              24)) /
            (1000 * 60 * 60)
        ),

        minutes: Math.floor(
          (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        ),

        seconds: Math.floor(
          (distance %
            (1000 * 60)) /
            1000
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(
      updateCountdown,
      1000
    );

    return () =>
      clearInterval(timer);
  }, [flashDeal?.endDate]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (

         <>
    <Header />
      <main
        className="
          min-h-screen

          bg-gray-50

          py-6
          sm:py-8
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
          {/* Banner Skeleton */}

          <div
            className="
              h-[220px]
              sm:h-[300px]
              lg:h-[380px]

              rounded-2xl
              lg:rounded-3xl

              bg-gray-200

              animate-pulse
            "
          />

          {/* Product Skeleton */}

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5

              gap-3
              sm:gap-4

              mt-8
            "
          >
            {[...Array(10)].map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    h-[320px]

                    bg-gray-200

                    rounded-xl

                    animate-pulse
                  "
                />
              )
            )}
          </div>
        </div>
      </main>
         <Footer />
  </>
    );
  }

  // ==========================================
  // Error / No Active Deal
  // ==========================================

  if (error || !flashDeal) {
    return (
            <>
      <Header />
      <main
        className="
          min-h-[70vh]

          bg-gray-50

          flex
          items-center
          justify-center

          px-4
          py-10
        "
      >
        <div
          className="
            w-full
            max-w-lg

            bg-white

            border
            border-gray-200

            rounded-3xl

            shadow-sm

            p-7
            sm:p-10

            text-center
          "
        >
          <div
            className="
              w-16
              h-16

              mx-auto

              rounded-full

              bg-gray-100

              flex
              items-center
              justify-center
            "
          >
            <FiZap
              className="
                text-2xl
                text-gray-400
              "
            />
          </div>

          <h1
            className="
              mt-5

              text-2xl
              sm:text-3xl

              font-bold

              text-gray-900
            "
          >
            No Sale Available
          </h1>

          <p
            className="
              mt-2

              text-sm
              sm:text-base

              text-gray-500
            "
          >
            {error ||
              "There is currently no active sale."}
          </p>

          <Link
            to="/"
            className="
              mt-6

              inline-flex
              items-center
              justify-center

              gap-2

              h-11

              px-6

              rounded-xl

              text-white

              font-semibold
            "
            style={{
              backgroundColor:
                "var(--primary-color,#355E3B)",
            }}
          >
            <FiArrowLeft />

            Back to Home
          </Link>
        </div>
      </main>
        <Footer />
    </>
    );
  }

  // ==========================================
  // Products
  // Backend should populate flashDeal.products
  // ==========================================

  const products = Array.isArray(
    flashDeal?.products
  )
    ? flashDeal.products
    : [];

  // ==========================================
  // Timer Box
  // ==========================================

  const TimerBox = ({
    value,
    label,
  }) => {
    return (
      <div
        className="
          min-w-[58px]
          sm:min-w-[70px]
          lg:min-w-[82px]

          bg-white

          rounded-xl

          px-2
          sm:px-3

          py-2
          sm:py-3

          text-center

          shadow-sm
        "
      >
        <div
          className="
            text-lg
            sm:text-xl
            lg:text-2xl

            font-black
          "
          style={{
            color:
              "var(--primary-color,#355E3B)",
          }}
        >
          {String(value).padStart(
            2,
            "0"
          )}
        </div>

        <div
          className="
            mt-0.5

            text-[9px]
            sm:text-[10px]

            uppercase

            font-semibold

            text-gray-500
          "
        >
          {label}
        </div>
      </div>
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
      <>
    {/* ====================================== */}
    {/* Website Header / Navbar */}
    {/* ====================================== */}

    <Header />
    <main
      className="
        min-h-screen

        bg-[#f7f8f7]

        pb-12
        sm:pb-16
      "
    >
      {/* ====================================== */}
      {/* Top Navigation */}
      {/* ====================================== */}

      <div
        className="
          w-full
          max-w-[1450px]

          mx-auto

          px-3
          sm:px-5
          lg:px-8

          pt-5
          sm:pt-7
        "
      >
        <Link
          to="/"
          className="
            inline-flex
            items-center

            gap-2

            text-sm
            sm:text-base

            font-semibold

            transition-opacity

            hover:opacity-70
          "
          style={{
            color:
              "var(--primary-color,#355E3B)",
          }}
        >
          <FiArrowLeft />

          Back to Home
        </Link>
      </div>

      {/* ====================================== */}
      {/* Sale Hero */}
      {/* ====================================== */}

      <section
        className="
          w-full
          max-w-[1450px]

          mx-auto

          px-3
          sm:px-5
          lg:px-8

          mt-5
        "
      >
        <div
          className="
            relative

            min-h-[260px]
            sm:min-h-[320px]
            lg:min-h-[390px]

            overflow-hidden

            rounded-2xl
            lg:rounded-3xl

            shadow-sm
          "
          style={{
            backgroundColor:
              flashDeal.backgroundColor ||
              "var(--primary-color,#355E3B)",
          }}
        >
          {/* Banner Image */}

          {flashDeal.bannerImage && (
            <img
              src={
                flashDeal.bannerImage
              }
              alt={
                flashDeal.title ||
                "Flash Sale"
              }
              className="
                absolute
                inset-0

                w-full
                h-full

                object-cover
              "
            />
          )}

          {/* Dark Overlay */}

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r

              from-black/75
              via-black/45
              to-black/10
            "
          />

          {/* Content */}

          <div
            className="
              relative
              z-10

              min-h-[260px]
              sm:min-h-[320px]
              lg:min-h-[390px]

              flex
              items-center

              p-5
              sm:p-8
              lg:p-12
            "
          >
            <div
              className="
                w-full
                max-w-2xl
              "
            >
              {/* Badge */}

              <span
                className="
                  inline-flex
                  items-center

                  gap-2

                  px-3
                  sm:px-4

                  py-1.5
                  sm:py-2

                  rounded-full

                  bg-red-500

                  text-white

                  text-xs
                  sm:text-sm

                  font-bold
                "
              >
                <FiZap />

                FLASH SALE
              </span>

              {/* Title */}

              <h1
                className="
                  mt-4

                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl

                  leading-tight

                  font-black

                  text-white
                "
              >
                {flashDeal.title}
              </h1>

              {/* Subtitle */}

              {flashDeal.subtitle && (
                <p
                  className="
                    mt-3

                    max-w-xl

                    text-sm
                    sm:text-base
                    lg:text-lg

                    leading-6
                    lg:leading-7

                    text-white/90
                  "
                >
                  {flashDeal.subtitle}
                </p>
              )}

              {/* Ends In */}

              <div
                className="
                  mt-5

                  flex
                  items-center

                  gap-2

                  text-xs
                  sm:text-sm

                  font-semibold

                  text-white/90
                "
              >
                <FiClock />

                Sale ends in
              </div>

              {/* Timer */}

              <div
                className="
                  mt-3

                  flex
                  items-center

                  gap-2
                  sm:gap-3

                  overflow-x-auto

                  pb-1

                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                <TimerBox
                  value={timeLeft.days}
                  label="Days"
                />

                <TimerBox
                  value={timeLeft.hours}
                  label="Hours"
                />

                <TimerBox
                  value={timeLeft.minutes}
                  label="Mins"
                />

                <TimerBox
                  value={timeLeft.seconds}
                  label="Secs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* Sale Products */}
      {/* ====================================== */}

      <section
        className="
          w-full
          max-w-[1450px]

          mx-auto

          px-3
          sm:px-5
          lg:px-8

          mt-8
          sm:mt-10
        "
      >
        {/* Heading */}

        <div
          className="
            flex
            flex-col

            sm:flex-row
            sm:items-end
            sm:justify-between

            gap-2

            mb-5
            sm:mb-7
          "
        >
          <div>
            <div
              className="
                flex
                items-center

                gap-2
              "
            >
              <FiZap
                className="
                  text-xl
                "
                style={{
                  color:
                    "var(--primary-color,#355E3B)",
                }}
              />

              <h2
                className="
                  text-2xl
                  sm:text-3xl

                  font-black

                  text-gray-900
                "
              >
                Sale Products
              </h2>
            </div>

            <p
              className="
                mt-1

                text-sm
                sm:text-base

                text-gray-500
              "
            >
              Grab these deals before
              the sale ends.
            </p>
          </div>

          {products.length > 0 && (
            <p
              className="
                text-sm
                font-medium
                text-gray-500
              "
            >
              {products.length}{" "}
              {products.length === 1
                ? "Product"
                : "Products"}
            </p>
          )}
        </div>

        {/* ==================================== */}
        {/* Product Grid */}
        {/* ==================================== */}

        {products.length > 0 ? (
          <div
            className="
              grid

              grid-cols-2

              md:grid-cols-3

              lg:grid-cols-4

              xl:grid-cols-5

              gap-2
              sm:gap-4
              lg:gap-5
            "
          >
            {products.map(
              (product, index) => {
                const productId =
                  product?._id ||
                  product?.id ||
                  `sale-product-${index}`;

                return (
                  <ProductCard
                    key={String(
                      productId
                    )}
                    product={
                      product
                    }
                  />
                );
              }
            )}
          </div>
        ) : (
          /* ================================== */
          /* No Products */
          /* ================================== */

          <div
            className="
              min-h-[300px]

              bg-white

              border
              border-gray-200

              rounded-2xl

              flex
              items-center
              justify-center

              p-6

              text-center
            "
          >
            <div>
              <div
                className="
                  w-14
                  h-14

                  mx-auto

                  rounded-full

                  bg-gray-100

                  flex
                  items-center
                  justify-center
                "
              >
                <FiZap
                  className="
                    text-2xl
                    text-gray-400
                  "
                />
              </div>

              <h3
                className="
                  mt-4

                  text-lg
                  font-bold

                  text-gray-800
                "
              >
                No Sale Products
              </h3>

              <p
                className="
                  mt-1

                  text-sm

                  text-gray-500
                "
              >
                No products have been
                added to this sale yet.
              </p>

              <Link
                to="/"
                className="
                  inline-flex
                  items-center

                  gap-2

                  mt-5

                  font-semibold

                  text-sm
                "
                style={{
                  color:
                    "var(--primary-color,#355E3B)",
                }}
              >
                <FiArrowLeft />

                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
       {/* ====================================== */}
    {/* Website Footer */}
    {/* ====================================== */}

    <Footer />
  </>
  );
};

export default FlashDeals;