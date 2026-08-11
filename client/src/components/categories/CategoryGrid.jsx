import {
  useMemo,
} from "react";

import ProductCard from "../product-card/ProductCard";

import {
  useProductsQuery,
} from "../../hooks/useProductQueries";

// ==========================================
// Category Grid
// ==========================================

const CategoryGrid = ({
  categorySlug,
  menuGroupSlug,
  subCategorySlug,
  filters = {},
}) => {
  // ========================================
  // API Parameters
  // ========================================

  const params = useMemo(
    () => ({
      category: categorySlug,
      menuGroup: menuGroupSlug,
      subCategory: subCategorySlug,

      ...filters,
    }),
    [
      categorySlug,
      menuGroupSlug,
      subCategorySlug,
      filters,
    ]
  );

  // ========================================
  // React Query
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useProductsQuery(params);

  // ========================================
  // Products
  // ========================================

  const products =
    data?.products ||
    data?.data?.products ||
    [];

  // ========================================
  // Sorting
  // ========================================

  const sortedProducts =
    useMemo(() => {
      const result = [
        ...products,
      ];

      switch (
        filters?.sort ||
        "latest"
      ) {
        case "priceLow":
          result.sort(
            (a, b) =>
              Number(a.price || 0) -
              Number(b.price || 0)
          );
          break;

        case "priceHigh":
          result.sort(
            (a, b) =>
              Number(b.price || 0) -
              Number(a.price || 0)
          );
          break;

        case "rating":
          result.sort(
            (a, b) =>
              Number(b.rating || 0) -
              Number(a.rating || 0)
          );
          break;

        case "latest":
        default:
          result.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ) -
              new Date(
                a.createdAt
              )
          );
      }

      return result;
    }, [
      products,
      filters?.sort,
    ]);

  // ========================================
  // Loading
  // ========================================

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-[var(--primary-color,#355E3B)]
              border-t-transparent
            "
          />

          <p
            className="
              mt-4
              font-medium
              text-gray-500
            "
          >
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          bg-white
          p-10
          text-center
          shadow-sm
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-gray-800
          "
        >
          Failed to load products
        </h2>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Please try again later.
        </p>
      </div>
    );
  }

  // ========================================
  // Empty
  // ========================================

  if (
    sortedProducts.length === 0
  ) {
    return (
      <div
        className="
          rounded-2xl
          bg-white
          p-10
          text-center
          shadow-sm
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-gray-800
          "
        >
          No Products Found
        </h2>

        <p
          className="
            mt-3
            text-gray-500
          "
        >
          Try another category or
          filter.
        </p>
      </div>
    );
  }

  // ========================================
  // Products
  // ========================================

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      {sortedProducts.map(
        (product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        )
      )}

      {/* Background fetching indicator */}

      {isFetching && (
        <div className="col-span-full py-3 text-center text-sm text-gray-400">
          Updating products...
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;