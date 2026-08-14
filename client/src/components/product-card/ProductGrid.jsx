import {
  useCallback,
  useMemo,
  useRef,
} from "react";

import ProductCard from "./ProductCard";
import SkeletonCard from "../common/SkeletonCard";

const ProductGrid = ({
  products = [],
  loading = false,
  hasMore = false,
  loadMore,
}) => {
  const observer = useRef(null);

  // ==========================================
  // Remove Duplicate Products
  // ==========================================

  const uniqueProducts = useMemo(() => {
    const seen = new Set();

    return products.filter((product) => {
      const id = product?._id || product?.id;

      // Product has no ID
      if (!id) {
        return true;
      }

      const normalizedId = String(id);

      if (seen.has(normalizedId)) {
        return false;
      }

      seen.add(normalizedId);

      return true;
    });
  }, [products]);

  // ==========================================
  // Infinite Scroll
  // ==========================================

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      if (!node || !hasMore) {
        return;
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];

          if (
            firstEntry?.isIntersecting &&
            hasMore &&
            !loading
          ) {
            loadMore?.();
          }
        },
        {
          threshold: 0.5,
        }
      );

      observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  // ==========================================
  // Render
  // ==========================================

  return (
    <section
      className="
        w-full
        py-10
        md:py-14
        bg-white
        text-gray-900
      "
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div
        className="
          w-full
          max-w-[1560px]
          mx-auto
          px-4
          md:px-6
          mb-10
          md:mb-12
        "
      >
        <h2
          className="
            text-center
            text-3xl
            md:text-4xl
            lg:text-5xl
            font-bold
            text-black
          "
        >
          Featured Products
        </h2>
      </div>

      {/* ====================================== */}
      {/* Products Container */}
      {/* ====================================== */}

<div
  className="
    w-[94%]
    sm:w-[94%]
    md:w-[92%]
    lg:w-[90%]
    xl:w-[88%]

    max-w-[1450px]

    mx-auto
  "
>
        {/* ====================================== */}
        {/* Products Grid */}
        {/* ====================================== */}
<div
className="
  grid

  grid-cols-2
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4

  gap-3
  sm:gap-4
  md:gap-6
  lg:gap-7

  w-full
"
>
          {uniqueProducts.map((product, index) => {
            const productId =
              product?._id ||
              product?.id ||
              `product-${index}`;

            const isLastProduct =
              index === uniqueProducts.length - 1;

            // ==================================
            // Last Product
            // Used for Infinite Scroll
            // ==================================

            if (isLastProduct) {
              return (
                <div
                  key={String(productId)}
                  ref={lastProductRef}
                  className="w-full min-w-0"
                >
                  <ProductCard product={product} />
                </div>
              );
            }

            // ==================================
            // Normal Product
            // ==================================

            return (
              <div
                key={String(productId)}
                className="w-full min-w-0"
              >
                <ProductCard product={product} />
              </div>
            );
          })}

          {/* ====================================== */}
          {/* Loading Skeleton */}
          {/* ====================================== */}

          {loading && (
            <>
              {[...Array(8)].map((_, index) => (
                <SkeletonCard
                  key={`skeleton-${index}`}
                />
              ))}

              <div
                className="
                  col-span-full
                  flex
                  justify-center
                  py-8
                  bg-white
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-[var(--primary-color,#355E3B)]
                    font-semibold
                  "
                >
                  <div
                    className="
                      w-5
                      h-5
                      rounded-full
                      border-2
                      border-current
                      border-t-transparent
                      animate-spin
                    "
                  />

                  Loading More Products...
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ====================================== */}
      {/* Empty Products */}
      {/* ====================================== */}

      {!loading && uniqueProducts.length === 0 && (
        <div
          className="
            text-center
            py-14
            bg-white
          "
        >
          <h2
            className="
              text-xl
              md:text-2xl
              text-gray-500
              font-semibold
            "
          >
            No Products Found
          </h2>
        </div>
      )}

      {/* ====================================== */}
      {/* No More Products */}
      {/* ====================================== */}

      {!loading &&
        uniqueProducts.length > 0 &&
        !hasMore && (
          <div
            className="
              text-center
              py-14
              bg-white
            "
          >
            <h2
              className="
                text-xl
                md:text-2xl
                text-gray-500
                font-semibold
              "
            >
              🎉 No More Products
            </h2>
          </div>
        )}
    </section>
  );
};

export default ProductGrid;