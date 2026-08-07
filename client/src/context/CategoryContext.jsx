import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getCategories,
} from "../services/categoryService";

import {
  getMenuGroups,
} from "../services/menuGroupService";

import {
  getSubCategories,
} from "../services/subCategoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({
  children,
}) => {
  const [categories, setCategories] =
    useState([]);

  const [menuGroups, setMenuGroups] =
    useState([]);

  const [subCategories, setSubCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================
      Load All Data
  ===================================== */

  const loadCategories =
    useCallback(async () => {
      try {
        setLoading(true);

        const [
          categoryRes,
          menuGroupRes,
          subCategoryRes,
        ] = await Promise.all([
          getCategories(),

          getMenuGroups(),

          getSubCategories(),
        ]);

        setCategories(
          categoryRes.data || []
        );

        setMenuGroups(
          menuGroupRes.data || []
        );

        setSubCategories(
          subCategoryRes.data || []
        );

        setError("");
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data?.message ||
            "Failed to load categories."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /* =====================================
      Refresh
  ===================================== */

  const refreshCategories =
    async () => {
      await loadCategories();
    };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <CategoryContext.Provider
      value={{
        categories,

        menuGroups,

        subCategories,

        loading,

        error,

        refreshCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () =>
  useContext(CategoryContext);