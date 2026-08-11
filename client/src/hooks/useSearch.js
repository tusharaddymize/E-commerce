import {
  useEffect,
  useState,
} from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getProducts,
} from "../services/productService";

// ==========================================
// Search Hook
// ==========================================

const useSearch = (
  keyword = ""
) => {
  const [
    debouncedKeyword,
    setDebouncedKeyword,
  ] = useState("");

  // ========================================
  // Debounce
  // ========================================

  useEffect(() => {
    const value =
      keyword.trim();

    const timer =
      setTimeout(() => {
        setDebouncedKeyword(
          value
        );
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [keyword]);

  // ========================================
  // React Query
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      "product-search",
      debouncedKeyword,
    ],

    queryFn: async () => {
      return await getProducts({
        search:
          debouncedKeyword,

        limit: 8,
      });
    },

    enabled:
      Boolean(debouncedKeyword),

    staleTime:
      2 * 60 * 1000,

    gcTime:
      10 * 60 * 1000,

    refetchOnWindowFocus:
      false,

    refetchOnReconnect:
      false,

    retry: 1,
  });

  // ========================================
  // Products
  // ========================================

  const products =
    data?.products ||
    data?.data?.products ||
    [];

  // ========================================
  // Return
  // ========================================

  return {
    products,

    loading:
      isLoading ||
      isFetching,

    error,
  };
};

export default useSearch;