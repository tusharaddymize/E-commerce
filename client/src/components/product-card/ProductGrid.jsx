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
      const id =
        product?._id || product?.id;

      // Product has no ID
      if (!id) {
        return true;
      }

      const normalizedId =
        String(id);

      if (
        seen.has(normalizedId)
      ) {
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

      observer.current =
        new IntersectionObserver(
          (entries) => {
            const firstEntry =
              entries[0];

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

      observer.current.observe(
        node
      );
    },
    [
      loading,
      hasMore,
      loadMore,
    ]
  );

  return (
    <section className="bg-white pt-20 pb-20">
      <div
        className="
          w-full
          max-w-[var(--container-width,1450px)]
          mx-auto
px-0
sm:px-1
lg:px-6
xl:px-7
        "
      >
        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            
            mb-12
          "
        >
          <div className="hidden lg:block w-24" />

          <h2
            className="
              text-3xl
              md:text-4xl
              lg:text-5xl

              font-bold
              text-center

              flex-1
            "
          >
            Featured Products
          </h2>

      
        </div>

        {/* ====================================== */}
        {/* Products */}
        {/* ====================================== */}

<div
  className="
    grid

    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-5

    gap-0
    lg:gap-5
    xl:gap-6
  "
>
          {uniqueProducts.map(
            (product, index) => {
              const productId =
                product?._id ||
                product?.id ||
                `product-${index}`;

              const isLastProduct =
                index ===
                uniqueProducts.length -
                  1;

              if (isLastProduct) {
                return (
                  <div
                    key={String(
                      productId
                    )}
                    ref={
                      lastProductRef
                    }
                    className="w-full"
                  >
                    <ProductCard
                      product={
                        product
                      }
                    />
                  </div>
                );
              }

              return (
                <ProductCard
                  key={String(
                    productId
                  )}
                  product={product}
                />
              );
            }
          )}

          {/* ====================================== */}
          {/* Loading Skeleton */}
          {/* ====================================== */}

          {loading && (
            <>
              {[...Array(8)].map(
                (_, index) => (
                  <SkeletonCard
                    key={`skeleton-${index}`}
                  />
                )
              )}

              <div
                className="
                  col-span-full
                  flex
                  justify-center
                  py-8
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    text-[var(--primary-color)]

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

                  Loading More
                  Products...
                </div>
              </div>
            </>
          )}
        </div>

        {/* ====================================== */}
        {/* Empty Products */}
        {/* ====================================== */}

        {!loading &&
          uniqueProducts.length ===
            0 && (
            <div className="text-center py-14">
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