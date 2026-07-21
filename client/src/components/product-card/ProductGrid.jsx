import { useCallback, useRef } from "react";

import ProductCard from "./ProductCard";
import SkeletonCard from "../common/SkeletonCard";

import useProducts from "../../hooks/useProducts";

const ProductGrid = () => {

  const {
    products,
    loading,
    hasMore,
    loadMore,
  } = useProducts();

  const observer = useRef();

  // =====================================
  // Infinite Scroll
  // =====================================

  const lastProductRef = useCallback(

    (node) => {

      if (loading) return;

      if (observer.current) {

        observer.current.disconnect();

      }

      observer.current =
        new IntersectionObserver(
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

      <div className="max-w-[1450px] mx-auto px-6">

        {/* Heading */}

        <div className="flex justify-between items-center mb-14">

          <div className="w-24"></div>

          <h2 className="text-5xl font-bold">

            Featured Products

          </h2>

          <button
            className="
            text-[#355E3B]
            font-semibold
            text-xl
            hover:underline
            "
          >

            Explore

          </button>

        </div>

        {/* Products */}

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          "
        >

          {products.map((product, index) => {

            if (
              index ===
              products.length - 1
            ) {

              return (

                <div
                  ref={lastProductRef}
                  key={product._id}
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

          {/* Skeleton */}

{loading && (
  <>
    {[...Array(8)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}

    <div className="col-span-full text-center py-8">
      <div className="inline-flex items-center gap-3 text-[#355E3B] font-semibold">
        <div className="w-5 h-5 rounded-full border-2 border-[#355E3B] border-t-transparent animate-spin"></div>

        Loading More Products...
      </div>
    </div>
  </>
)}

        </div>

        {/* End */}

        {!hasMore &&
          !loading && (

          <div className="text-center py-14">

            <h2
              className="
              text-2xl
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