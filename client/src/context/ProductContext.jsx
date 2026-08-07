import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { getProducts } from "../services/productService";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // ==========================================
  // States
  // ==========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({});

  // ==========================================
  // Load Products
  // ==========================================

  const loadProducts = useCallback(
    async (
      options = {},
      reset = true
    ) => {
      try {
        setLoading(true);

        const {
          page: currentPage = 1,
          limit = 20,
          ...queryFilters
        } = options;

        const params = {
          page: currentPage,
          limit,
          ...queryFilters,
        };

        // Remove Empty Values

        Object.keys(params).forEach((key) => {
          const value = params[key];

          if (
            value === "" ||
            value === undefined ||
            value === null ||
            (Array.isArray(value) &&
              value.length === 0)
          ) {
            delete params[key];
          }
        });

        const response =
          await getProducts(params);

        const productsData =
          response?.products ||
          response?.data?.products ||
          [];

        const totalPages =
          response?.totalPages ||
          response?.data?.totalPages ||
          1;

        if (reset) {
          setProducts(productsData);
        } else {
          setProducts((prev) => {
            const existingIds =
              new Set(
                prev.map((item) =>
                  String(item._id)
                )
              );

            const newProducts =
              productsData.filter(
                (item) =>
                  !existingIds.has(
                    String(item._id)
                  )
              );

            return [
              ...prev,
              ...newProducts,
            ];
          });
        }

        setPage(currentPage);

        setHasMore(
          currentPage < totalPages
        );

        setFilters(queryFilters);

      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        if (reset) {
          setProducts([]);
        }

        setHasMore(false);

      } finally {
        setLoading(false);
      }
    },
    []
  );
    // ==========================================
  // First Load
  // ==========================================

  useEffect(() => {
    loadProducts(
      {
        page: 1,
        limit: 20,
      },
      true
    );
  }, [loadProducts]);

  // ==========================================
  // Refresh Products
  // ==========================================

  const refreshProducts = async (
    newFilters = filters
  ) => {
    setHasMore(true);

    setPage(1);

    await loadProducts(
      {
        page: 1,
        limit: 20,
        ...newFilters,
      },
      true
    );
  };

  // ==========================================
  // Load More
  // ==========================================

  const loadMore = async () => {
    if (loading || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    await loadProducts(
      {
        page: nextPage,
        limit: 20,
        ...filters,
      },
      false
    );
  };
    // ==========================================
  // Context
  // ==========================================

  return (
    <ProductContext.Provider
      value={{
        // Data
        products,

        // States
        loading,
        page,
        hasMore,
        filters,

        // Actions
        loadProducts,
        loadMore,
        refreshProducts,

        // Setters
        setProducts,
        setFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;