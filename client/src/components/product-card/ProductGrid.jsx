import { useCallback, useRef } from "react";

import ProductCard from "./ProductCard";
import SkeletonCard from "../common/SkeletonCard";

const ProductGrid = ({
  products = [],
  loading,
  hasMore,
  loadMore,
}) => {
  const observer = useRef();

  // ==========================
  // Infinite Scroll
  // ==========================

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore
          ) {
            loadMore();
          }
        },
        {
          threshold: 0.5,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, loadMore]
  );

  return (
    <section className="bg-white pt-20 pb-20">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================= */}
        {/* Heading */}
        {/* ========================= */}

        <div className="flex items-center justify-between mb-12">
          <div className="hidden lg:block w-24"></div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center flex-1">
            Featured Products
          </h2>

          <button
            className="
            text-[#355E3B]
            font-semibold
            text-base
            md:text-lg
            hover:underline
            "
          >
            Explore
          </button>
        </div>

        {/* ========================= */}
        {/* Products */}
        {/* ========================= */}

        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5
          lg:gap-8
          "
        >
          {products.map((product, index) => {
            if (
              index ===
              products.length - 1
            ) {
              return (
                <div
                  key={product._id}
                  ref={lastProductRef}
                >
                  <ProductCard
                    product={product}
                  />
                </div>
              );
            }

            return (
              <ProductCard
                key={product._id}
                product={product}
              />
            );
          })}

          {/* ========================= */}
          {/* Loading */}
          {/* ========================= */}

          {loading && (
            <>
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}

              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-3 text-[#355E3B] font-semibold">
                  <div
                    className="
                    w-5
                    h-5
                    rounded-full
                    border-2
                    border-[#355E3B]
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

        {/* ========================= */}
        {/* No More Products */}
        {/* ========================= */}

        {!loading &&
          !hasMore && (
            <div className="text-center py-14">
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
      </div>
    </section>
  );
};

export default ProductGrid;