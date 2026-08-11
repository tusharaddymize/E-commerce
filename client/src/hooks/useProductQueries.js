import {
  useQuery,
} from "@tanstack/react-query";

import {
  getProducts,
  getProductById,
} from "../services/productService";

// ==========================================
// Common Query Options
// ==========================================

const commonOptions = {
  staleTime: 5 * 60 * 1000,

  gcTime: 30 * 60 * 1000,

  refetchOnWindowFocus: false,

  refetchOnReconnect: false,

  refetchOnMount: false,

  retry: 1,
};

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
// Products Query
// ==========================================

export const useProductsQuery = (
  params = {},
  options = {}
) => {
  const cleanedParams =
    cleanParams(params);

  return useQuery({
    queryKey: [
      "products",
      cleanedParams,
    ],

    queryFn: async () => {
      return await getProducts(
        cleanedParams
      );
    },

    ...commonOptions,

    ...options,
  });
};

// ==========================================
// Product By ID
// ==========================================

export const useProductQuery = (
  id,
  options = {}
) => {
  return useQuery({
    queryKey: [
      "product",
      id,
    ],

    queryFn: async () => {
      return await getProductById(id);
    },

    enabled:
      Boolean(id) &&
      (options.enabled ?? true),

    ...commonOptions,

    ...options,
  });
};

// ==========================================
// Related Products
// ==========================================

export const useRelatedProductsQuery = (
  params = {},
  options = {}
) => {
  const cleanedParams =
    cleanParams(params);

  return useQuery({
    queryKey: [
      "related-products",
      cleanedParams,
    ],

    queryFn: async () => {
      return await getProducts(
        cleanedParams
      );
    },

    enabled:
      Object.keys(cleanedParams)
        .length > 0 &&
      (options.enabled ?? true),

    ...commonOptions,

    ...options,
  });
};