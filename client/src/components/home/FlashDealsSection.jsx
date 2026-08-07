import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import FlashDealCard from "./FlashDealCard";
import ProductTabs from "./ProductTabs";
import ExploreProductGrid from "../product-card/ExploreProductGrid";

import {
  getFlashDeal,
} from "../../services/flashDealService";

const FlashDealsSection = ({
  products = [],
}) => {
  const [activeTab, setActiveTab] =
    useState("trending");

  const [flashDeal, setFlashDeal] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // Fetch Flash Deal
  // ==========================================

  useEffect(() => {
    const fetchFlashDeal = async () => {
      try {
        setLoading(true);

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
          setFlashDeal(null);
        }
      } catch (error) {
        console.error(
          "Flash Deal Error:",
          error
        );

        setFlashDeal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashDeal();
  }, []);

  // ==========================================
  // Filter Products
  // ==========================================

  const filteredProducts =
    useMemo(() => {
      switch (activeTab) {
        case "trending":
          return products.filter(
            (item) =>
              item.isTrending
          );

        case "featured":
          return products.filter(
            (item) =>
              item.isFeatured
          );

        case "new":
          return products.filter(
            (item) =>
              item.isNewArrival
          );

        case "best":
          return products.filter(
            (item) =>
              item.isBestSelling
          );

        default:
          return [];
      }
    }, [activeTab, products]);

  // ==========================================
  // Background
  // ==========================================

  const sectionBackground = {
    background:
      "linear-gradient(to bottom, color-mix(in srgb, var(--primary-color,#355E3B) 5%, white), #ffffff)",
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <section
        className="
          py-6
          sm:py-8
          lg:py-10
        "
        style={sectionBackground}
      >
        <div
          className="
            w-full
            max-w-[var(--container-width,1450px)]

            mx-auto

            px-2
            sm:px-4
            lg:px-6
          "
        >
          <div
            className="
              h-[300px]
              sm:h-[350px]
              lg:h-[420px]

              animate-pulse

              rounded-2xl

              bg-gray-200
            "
          />
        </div>
      </section>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <section
      className="
        py-6
        sm:py-8
        lg:py-10
      "
      style={sectionBackground}
    >
      <div
        className="
          w-full

          max-w-[var(--container-width,1450px)]

          mx-auto

          px-2
          sm:px-4
          lg:px-6
        "
      >
        {/* ==================================== */}
        {/* Main Container */}
        {/* ==================================== */}

        <div
          className="
            bg-white

            border
            border-gray-100

            rounded-xl
            sm:rounded-2xl
            lg:rounded-3xl

            shadow-sm

            p-2
            sm:p-4
            lg:p-6
          "
        >
          {/* ================================== */}
          {/* Heading */}
          {/* ================================== */}

          <div
            className="
              mb-4
              sm:mb-5
              lg:mb-7
            "
          >
            <h2
              className="
                text-xl
                sm:text-2xl
                lg:text-4xl

                font-bold
                text-gray-900

                tracking-tight
              "
            >
              Explore Products
            </h2>

            <p
              className="
                mt-1
                sm:mt-2

                text-xs
                sm:text-sm
                lg:text-base

                text-gray-500
              "
            >
              Discover our latest collections
              curated just for you.
            </p>
          </div>

          {/* ================================== */}
          {/* Tabs */}
          {/* ================================== */}

          <div
            className="
              w-full

              mb-4
              sm:mb-5
              lg:mb-7

              overflow-x-auto

              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <ProductTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* ================================== */}
          {/* Flash Deal + Products */}
          {/* ================================== */}

          <div
            className={`
              grid
              grid-cols-1

              ${
                flashDeal
                  ? "xl:grid-cols-[300px_minmax(0,1fr)]"
                  : "xl:grid-cols-1"
              }

              gap-4
              lg:gap-5

              items-stretch
            `}
          >
            {/* ================================= */}
            {/* Flash Deal */}
            {/* Only Render When Admin Has Deal */}
            {/* ================================= */}

            {flashDeal && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="
                  w-full
                  min-w-0
                "
              >
                <FlashDealCard
                  flashDeal={flashDeal}
                />
              </motion.div>
            )}

            {/* ================================= */}
            {/* Products */}
            {/* ================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                w-full
                min-w-0
              "
            >
              {filteredProducts.length >
              0 ? (
                <ExploreProductGrid
                  products={
                    filteredProducts
                  }
                />
              ) : (
                <div
                  className="
                    min-h-[220px]
                    sm:min-h-[280px]

                    flex
                    items-center
                    justify-center

                    bg-gray-50

                    border
                    border-gray-200

                    rounded-xl
                    sm:rounded-2xl
                  "
                >
                  <div className="text-center px-5">
                    <p
                      className="
                        text-base
                        sm:text-lg

                        font-semibold
                        text-gray-700
                      "
                    >
                      No products found
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs
                        sm:text-sm

                        text-gray-500
                      "
                    >
                      Products will appear here
                      when available.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashDealsSection;