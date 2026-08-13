import {
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import FlashDealCard from "./FlashDealCard";
import ProductTabs from "./ProductTabs";
import ExploreProductGrid from "../product-card/ExploreProductGrid";

import { useQuery } from "@tanstack/react-query";

import {
  getFlashDeal,
} from "../../services/flashDealService";

// ==========================================
// Flash Deal Query Key
// ==========================================

export const FLASH_DEAL_QUERY_KEY = [
  "flash-deals",
];

// ==========================================
// Flash Deals Section
// ==========================================

const FlashDealsSection = ({
  products = [],
}) => {
  // ========================================
  // Active Tab
  // ========================================

  const [activeTab, setActiveTab] =
    useState("trending");

  // ========================================
  // React Query - Flash Deal
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey:
      FLASH_DEAL_QUERY_KEY,

    queryFn: async () => {
      return await getFlashDeal();
    },

    // ======================================
    // Cache
    // ======================================

    staleTime:
      5 * 60 * 1000,

    gcTime:
      30 * 60 * 1000,

    // ======================================
    // Don't refetch unnecessarily
    // ======================================

    refetchOnWindowFocus:
      false,

    refetchOnReconnect:
      false,

    refetchOnMount:
      false,

    // ======================================
    // Retry
    // ======================================

    retry: 1,
  });

  // ========================================
  // Extract Flash Deal
  // ========================================

  const flashDeal =
    data?.success &&
    data?.flashDeal
      ? data.flashDeal
      : null;

  // ========================================
  // Filter Products
  // ========================================

  const filteredProducts =
    useMemo(() => {
      switch (activeTab) {
        case "trending":
          return products.filter(
            (item) =>
              item?.isTrending
          );

        case "featured":
          return products.filter(
            (item) =>
              item?.isFeatured
          );

        case "new":
          return products.filter(
            (item) =>
              item?.isNewArrival
          );

        case "best":
          return products.filter(
            (item) =>
              item?.isBestSelling
          );

        default:
          return [];
      }
    }, [
      activeTab,
      products,
    ]);

  // ========================================
  // Background Fetching
  // ========================================

  const backgroundLoading =
    isFetching &&
    !isLoading;

  // ========================================
  // Section Background
  // ========================================

  const sectionBackground = {
    background:
      "linear-gradient(to bottom, color-mix(in srgb, var(--primary-color,#355E3B) 5%, white), #ffffff)",
  };

  // ========================================
  // Loading
  // ========================================

  if (isLoading) {
    return (
      <section
        className="w-full"
        style={sectionBackground}
      >
<div
  className="
    mx-auto

    w-[94%]
    sm:w-[94%]
    md:w-[92%]
    lg:w-[90%]
    xl:w-[88%]

    max-w-[1450px]
  "
>
          <div
            className="
              h-[300px]
              animate-pulse
              rounded-2xl
              bg-gray-200
              sm:h-[350px]
              lg:h-[420px]
            "
          />
        </div>
      </section>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (error) {
    console.error(
      "Flash Deal Error:",
      error
    );
  }

  // ========================================
  // Render
  // ========================================

  return (
    <section
      className="w-full"
      style={sectionBackground}
    >
<div
  className="
    mx-auto

    w-[94%]
    sm:w-[94%]
    md:w-[92%]
    lg:w-[90%]
    xl:w-[88%]

    max-w-[1450px]
  "
>
        {/* ==================================
            Main Container
        ================================== */}

        <div
          className="
            rounded-xl
            border
            border-gray-100
            bg-white
            p-2
            shadow-sm
            sm:rounded-2xl
            sm:p-4
            lg:rounded-3xl
            lg:p-6
          "
        >
          {/* ==================================
              Heading
          ================================== */}

          <div
            className="
              mb-4
              sm:mb-5
              lg:mb-7
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    sm:text-2xl
                    lg:text-4xl
                  "
                >
                  Explore Products
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    sm:mt-2
                    sm:text-sm
                    lg:text-base
                  "
                >
                  Discover our latest
                  collections curated
                  just for you.
                </p>
              </div>

              {/* Background refresh indicator */}

              {backgroundLoading && (
                <span
                  className="
                    hidden
                    shrink-0
                    text-xs
                    text-gray-400
                    sm:block
                  "
                >
                  Updating...
                </span>
              )}
            </div>
          </div>

          {/* ==================================
              Tabs
          ================================== */}

          <div
            className="
              mb-4
              w-full
              overflow-x-auto
              sm:mb-5
              lg:mb-7
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <ProductTabs
              activeTab={activeTab}
              setActiveTab={
                setActiveTab
              }
            />
          </div>

          {/* ==================================
              Flash Deal + Products
          ================================== */}

          <div
            className={`
              grid
              grid-cols-1
              items-stretch
              gap-4
              lg:gap-5
              ${
                flashDeal
                  ? "xl:grid-cols-[300px_minmax(0,1fr)]"
                  : "xl:grid-cols-1"
              }
            `}
          >
            {/* =================================
                Flash Deal
            ================================= */}

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
                  flashDeal={
                    flashDeal
                  }
                />
              </motion.div>
            )}

            {/* =================================
                Products
            ================================= */}

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
                    flex
                    min-h-[220px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    sm:min-h-[280px]
                    sm:rounded-2xl
                  "
                >
                  <div
                    className="
                      px-5
                      text-center
                    "
                  >
                    <p
                      className="
                        text-base
                        font-semibold
                        text-gray-700
                        sm:text-lg
                      "
                    >
                      No products found
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                        sm:text-sm
                      "
                    >
                      Products will
                      appear here
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