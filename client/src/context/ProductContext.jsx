import {
  createContext,
  useContext,
  useMemo,
} from "react";

import {
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProducts,
} from "../services/productService";

// ==========================================
// Context
// ==========================================

export const ProductContext =
  createContext();

// ==========================================
// Base Query Key
// ==========================================

export const PRODUCTS_QUERY_KEY = [
  "products",
];

// ==========================================
// Clean Parameters
// ==========================================

const cleanParams = (params = {}) => {
  const cleaned = {};

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value === "" ||
        value === undefined ||
        value === null ||
        (Array.isArray(value) &&
          value.length === 0)
      ) {
        return;
      }

      cleaned[key] = value;
    }
  );

  return cleaned;
};

// ==========================================
// Product Provider
// ==========================================

const ProductProvider = ({
  children,
}) => {
  const queryClient =
    useQueryClient();

  // ========================================
  // Main Product Query
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    // ======================================
    // IMPORTANT
    // Homepage products only
    // ======================================

    queryKey: [
      ...PRODUCTS_QUERY_KEY,
      {
        pageSize: 20,
      },
    ],

    // ======================================
    // API Request
    // ======================================

    queryFn: async ({
      pageParam = 1,
    }) => {
      const response =
        await getProducts({
          page: pageParam,
          limit: 20,
        });

      return response;
    },

    // ======================================
    // First Page
    // ======================================

    initialPageParam: 1,

    // ======================================
    // Next Page
    // ======================================

    getNextPageParam: (
      lastPage,
      allPages
    ) => {
      const totalPages =
        lastPage?.totalPages ??
        lastPage?.data?.totalPages ??
        1;

      const currentPage =
        allPages.length;

      if (
        currentPage <
        totalPages
      ) {
        return currentPage + 1;
      }

      return undefined;
    },

    // ======================================
    // Cache
    // ======================================

    staleTime:
      5 * 60 * 1000,

    gcTime:
      30 * 60 * 1000,

    // ======================================
    // Refetch Settings
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
  // Combine Pages
  // ========================================

  const products = useMemo(() => {
    const allProducts =
      data?.pages?.flatMap(
        (page) =>
          page?.products ||
          page?.data?.products ||
          []
      ) || [];

    // ======================================
    // Remove Duplicate Products
    // ======================================

    const uniqueMap =
      new Map();

    allProducts.forEach(
      (product) => {
        const id =
          product?._id ||
          product?.id;

        if (!id) {
          return;
        }

        uniqueMap.set(
          String(id),
          product
        );
      }
    );

    return Array.from(
      uniqueMap.values()
    );
  }, [data]);

  // ========================================
  // Current Page
  // ========================================

  const page =
    data?.pages?.length || 1;

  // ========================================
  // Loading
  // ========================================

  const loading =
    isLoading;

  // ========================================
  // Background Fetching
  // ========================================

  const backgroundLoading =
    isFetching &&
    !isFetchingNextPage;

  // ========================================
  // Has More
  // ========================================

  const hasMore =
    Boolean(hasNextPage);

  // ========================================
  // Load Products
  //
  // Kept for compatibility with
  // existing components.
  // ========================================

  const loadProducts = async (
    options = {},
    reset = true
  ) => {
    const {
      page: requestedPage = 1,
      limit = 20,
      ...queryFilters
    } = options;

    const cleanedFilters =
      cleanParams(
        queryFilters
      );

    // ======================================
    // If filters are present
    //
    // IMPORTANT:
    // Filtered/category pages should use
    // their own React Query hooks.
    // ======================================

    if (
      Object.keys(
        cleanedFilters
      ).length > 0
    ) {
      console.warn(
        "Filtered products should use useProductsQuery()."
      );

      return;
    }

    // ======================================
    // First Page
    // ======================================

    if (
      reset ||
      requestedPage === 1
    ) {
      await refetch();
      return;
    }

    // ======================================
    // Next Page
    // ======================================

    if (
      hasNextPage &&
      !isFetchingNextPage
    ) {
      await fetchNextPage();
    }
  };

  // ========================================
  // Load More
  // ========================================

  const loadMore = async () => {
    if (
      isFetchingNextPage ||
      !hasNextPage
    ) {
      return;
    }

    await fetchNextPage();
  };

  // ========================================
  // Refresh Products
  // ========================================

  const refreshProducts = async () => {
    await queryClient.invalidateQueries(
      {
        queryKey:
          PRODUCTS_QUERY_KEY,
      }
    );

    await refetch();
  };

  // ========================================
  // Context Value
  // ========================================

  const contextValue =
    useMemo(
      () => ({
        // ================================
        // Data
        // ================================

        products,

        // ================================
        // States
        // ================================

        loading,

        backgroundLoading,

        page,

        hasMore,

        error,

        filters: {},

        isFetchingNextPage,

        // ================================
        // Actions
        // ================================

        loadProducts,

        loadMore,

        refreshProducts,

        // ================================
        // Compatibility
        // ================================

        setProducts: () => {
          console.warn(
            "Products are managed by React Query. Use refreshProducts() instead."
          );
        },

        setFilters: () => {
          console.warn(
            "Use useProductsQuery() for filtered products."
          );
        },
      }),
      [
        products,
        loading,
        backgroundLoading,
        page,
        hasMore,
        error,
        isFetchingNextPage,
        hasNextPage,
      ]
    );

  // ========================================
  // Render
  // ========================================

  return (
    <ProductContext.Provider
      value={contextValue}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ==========================================
// Hook
// ==========================================

export const useProduct = () =>
  useContext(ProductContext);

// ==========================================
// Export Provider
// ==========================================

export default ProductProvider;