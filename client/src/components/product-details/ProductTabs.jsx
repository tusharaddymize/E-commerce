import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import Reviews from "./Reviews";

const ProductTabs = ({ product }) => {
  // ==========================================
  // Dynamic Specifications
  // product.attributes can come as object
  // ==========================================

  const specifications = useMemo(() => {
    const attributes =
      product?.attributes;

    if (
      !attributes ||
      typeof attributes !== "object"
    ) {
      return [];
    }

    return Object.entries(attributes)
      .filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          value !== ""
      )
      .map(([key, value]) => ({
        key,

        label: formatLabel(key),

        value: formatValue(value),
      }));
  }, [product?.attributes]);

  // ==========================================
  // Tabs
  // ==========================================

  const tabs = [
    {
      key: "specifications",
      label: "Specifications",
    },
    {
      key: "reviews",
      label: `Ratings & Reviews${
        product?.totalReviews
          ? ` (${product.totalReviews})`
          : ""
      }`,
    },
  ];

  const [
    activeTab,
    setActiveTab,
  ] = useState("specifications");

  return (
    <section className="w-full">
      {/* ======================================
          TAB NAVIGATION
      ====================================== */}

      <div
        className="
          w-full

          border-b
          border-gray-200

          overflow-x-auto

          scrollbar-hide
        "
      >
        <div
          className="
            flex
            items-center

            min-w-max

            gap-7
            sm:gap-10
          "
        >
          {tabs.map((tab) => {
            const active =
              activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={`
                  relative

                  pb-4

                  text-sm
                  sm:text-base

                  font-semibold

                  whitespace-nowrap

                  transition-colors

                  ${
                    active
                      ? "text-[var(--color-primary,#355E3B)]"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {tab.label}

                {active && (
                  <motion.span
                    layoutId="product-tab-indicator"
                    className="
                      absolute

                      left-0
                      right-0
                      bottom-0

                      h-[3px]

                      rounded-t-full

                      bg-[var(--color-primary,#355E3B)]
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================
          TAB CONTENT
      ====================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -8,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            pt-6
            sm:pt-8
          "
        >
          {/* ==================================
              SPECIFICATIONS
          ================================== */}

          {activeTab ===
            "specifications" && (
            <div>
              <div className="mb-5">
                <h2
                  className="
                    text-xl
                    sm:text-2xl

                    font-bold

                    text-gray-900
                  "
                >
                  Product Specifications
                </h2>

                <p
                  className="
                    mt-1

                    text-sm

                    text-gray-500
                  "
                >
                  Detailed information about
                  this product.
                </p>
              </div>

              {specifications.length >
              0 ? (
                <div
                  className="
                    max-w-4xl

                    border
                    border-gray-200

                    rounded-xl

                    overflow-hidden

                    bg-white
                  "
                >
                  {specifications.map(
                    (
                      specification,
                      index
                    ) => (
                      <div
                        key={
                          specification.key
                        }
                        className={`
                          grid
                          grid-cols-[minmax(110px,0.8fr)_minmax(0,1.5fr)]

                          sm:grid-cols-[220px_minmax(0,1fr)]

                          gap-3
                          sm:gap-6

                          px-4
                          sm:px-5

                          py-3.5
                          sm:py-4

                          ${
                            index % 2 === 0
                              ? "bg-gray-50/70"
                              : "bg-white"
                          }

                          ${
                            index !==
                            specifications.length -
                              1
                              ? "border-b border-gray-100"
                              : ""
                          }
                        `}
                      >
                        {/* Label */}

                        <span
                          className="
                            text-xs
                            sm:text-sm

                            font-semibold

                            text-gray-600

                            break-words
                          "
                        >
                          {
                            specification.label
                          }
                        </span>

                        {/* Value */}

                        <span
                          className="
                            text-xs
                            sm:text-sm

                            font-medium

                            text-gray-900

                            break-words
                          "
                        >
                          {
                            specification.value
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    max-w-4xl

                    border
                    border-dashed
                    border-gray-300

                    rounded-xl

                    px-5
                    py-8

                    text-center
                  "
                >
                  <p
                    className="
                      text-sm

                      text-gray-500
                    "
                  >
                    No specifications available
                    for this product.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ==================================
              REVIEWS
          ================================== */}

          {activeTab === "reviews" && (
            <div>
              <div className="mb-5">
                <h2
                  className="
                    text-xl
                    sm:text-2xl

                    font-bold

                    text-gray-900
                  "
                >
                  Ratings & Reviews
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  See what customers think about
                  this product.
                </p>
              </div>

              <Reviews
                product={product}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

// ==========================================
// Format Attribute Key
//
// battery_backup → Battery Backup
// screenSize     → Screen Size
// ==========================================

const formatLabel = (key = "") => {
  return String(key)
    .replace(/[_-]+/g, " ")
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    )
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

// ==========================================
// Format Attribute Value
// ==========================================

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value
      .filter(Boolean)
      .join(", ");
  }

  if (
    typeof value === "boolean"
  ) {
    return value ? "Yes" : "No";
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    return Object.values(value)
      .filter(Boolean)
      .join(", ");
  }

  return String(value);
};

export default ProductTabs;