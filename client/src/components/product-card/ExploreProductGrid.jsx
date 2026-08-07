import { useMemo } from "react";

import ProductCard from "./ProductCard";

const ExploreProductGrid = ({
  products = [],
}) => {
  // ==========================================
  // Remove Duplicate Products
  // ==========================================

  const uniqueProducts = useMemo(() => {
    const seen = new Set();

    return products.filter((product) => {
      const id =
        product?._id || product?.id;

      if (!id) return true;

      const normalizedId =
        String(id);

      if (seen.has(normalizedId)) {
        return false;
      }

      seen.add(normalizedId);

      return true;
    });
  }, [products]);

  // ==========================================
  // Empty State
  // ==========================================

  if (!uniqueProducts.length) {
    return (
      <div
        className="
          w-full
          min-h-[220px]

          flex
          items-center
          justify-center

          bg-white

          border
          border-gray-200

          rounded-xl
          sm:rounded-2xl

          text-sm
          sm:text-base
          text-gray-500
        "
      >
        No Products Found
      </div>
    );
  }

  // ==========================================
  // Products
  // ==========================================

  return (
    <div
      className="
        w-full
        min-w-0
        overflow-hidden
      "
    >
      <div
        className="
          flex

          w-full

          overflow-x-auto
          overflow-y-hidden

          scroll-smooth
          touch-pan-x
          overscroll-x-contain

          snap-x
          snap-mandatory

          gap-2
          sm:gap-3
          lg:gap-4

          pb-2

          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {uniqueProducts.map(
          (product, index) => {
            const productId =
              product?._id ||
              product?.id ||
              `explore-product-${index}`;

            return (
              <div
                key={String(productId)}
                className="
                  shrink-0
                  snap-start

                  w-[calc(50%-4px)]

                  sm:w-[calc(50%-6px)]

                  md:w-[calc(33.333%-8px)]

                  lg:w-[calc(33.333%-11px)]

                  xl:w-[calc(25%-12px)]

                  2xl:w-[calc(25%-12px)]
                "
              >
                <ProductCard
                  product={product}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ExploreProductGrid;