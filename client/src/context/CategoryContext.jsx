import {
  createContext,
  useContext,
} from "react";

import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCategories,
} from "../services/categoryService";

import {
  getMenuGroups,
} from "../services/menuGroupService";

import {
  getSubCategories,
} from "../services/subCategoryService";

// ==========================================
// Context
// ==========================================

const CategoryContext =
  createContext();

// ==========================================
// Query Keys
// ==========================================

export const CATEGORIES_QUERY_KEY = [
  "categories",
];

export const MENU_GROUPS_QUERY_KEY = [
  "menu-groups",
];

export const SUB_CATEGORIES_QUERY_KEY = [
  "sub-categories",
];

// ==========================================
// Common Query Options
// ==========================================

const commonQueryOptions = {
  staleTime: 10 * 60 * 1000,

  gcTime: 30 * 60 * 1000,

  refetchOnWindowFocus: false,

  refetchOnReconnect: false,

  refetchOnMount: false,

  retry: 1,
};

// ==========================================
// Category Provider
// ==========================================

export const CategoryProvider = ({
  children,
}) => {
  const queryClient =
    useQueryClient();

  // ========================================
  // Categories
  // ========================================

  const {
    data: categoriesData,
    isLoading:
      categoriesLoading,
    isFetching:
      categoriesFetching,
    error:
      categoriesError,
    refetch:
      refetchCategories,
  } = useQuery({
    queryKey:
      CATEGORIES_QUERY_KEY,

    queryFn: async () => {
      const response =
        await getCategories();

      return (
        response?.data || []
      );
    },

    ...commonQueryOptions,
  });

  // ========================================
  // Menu Groups
  // ========================================

  const {
    data: menuGroupsData,
    isLoading:
      menuGroupsLoading,
    isFetching:
      menuGroupsFetching,
    error:
      menuGroupsError,
    refetch:
      refetchMenuGroups,
  } = useQuery({
    queryKey:
      MENU_GROUPS_QUERY_KEY,

    queryFn: async () => {
      const response =
        await getMenuGroups();

      return (
        response?.data || []
      );
    },

    ...commonQueryOptions,
  });

  // ========================================
  // Sub Categories
  // ========================================

  const {
    data: subCategoriesData,
    isLoading:
      subCategoriesLoading,
    isFetching:
      subCategoriesFetching,
    error:
      subCategoriesError,
    refetch:
      refetchSubCategories,
  } = useQuery({
    queryKey:
      SUB_CATEGORIES_QUERY_KEY,

    queryFn: async () => {
      const response =
        await getSubCategories();

      return (
        response?.data || []
      );
    },

    ...commonQueryOptions,
  });

  // ========================================
  // Final Data
  // ========================================

  const categories =
    categoriesData || [];

  const menuGroups =
    menuGroupsData || [];

  const subCategories =
    subCategoriesData || [];

  // ========================================
  // Combined Loading
  // ========================================

  const loading =
    categoriesLoading ||
    menuGroupsLoading ||
    subCategoriesLoading;

  // ========================================
  // Background Fetching
  // ========================================

  const isFetching =
    categoriesFetching ||
    menuGroupsFetching ||
    subCategoriesFetching;

  // ========================================
  // Error
  // ========================================

  const error =
    categoriesError ||
    menuGroupsError ||
    subCategoriesError;

  // ========================================
  // Refresh Categories
  // ========================================

  const refreshCategories =
    async () => {
      // ====================================
      // Invalidate Cache
      // ====================================

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            CATEGORIES_QUERY_KEY,
        }),

        queryClient.invalidateQueries({
          queryKey:
            MENU_GROUPS_QUERY_KEY,
        }),

        queryClient.invalidateQueries({
          queryKey:
            SUB_CATEGORIES_QUERY_KEY,
        }),
      ]);

      // ====================================
      // Refetch
      // ====================================

      await Promise.all([
        refetchCategories(),

        refetchMenuGroups(),

        refetchSubCategories(),
      ]);
    };

  // ========================================
  // Context Value
  // ========================================

  return (
    <CategoryContext.Provider
      value={{
        // ================================
        // Data
        // ================================

        categories,

        menuGroups,

        subCategories,

        // ================================
        // States
        // ================================

        loading,

        isFetching,

        error:
          error?.response?.data
            ?.message ||
          error?.message ||
          "",

        // ================================
        // Actions
        // ================================

        refreshCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// ==========================================
// Hook
// ==========================================

export const useCategory = () =>
  useContext(CategoryContext);

// ==========================================
// Export
// ==========================================

export default CategoryProvider;