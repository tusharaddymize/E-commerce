import { useEffect, useState } from "react";

import DynamicFilter from "./DynamicFilter";

import {
  getProductFilters,
} from "../../services/productService";

const CategorySidebar = ({
  categorySlug,
  menuGroupSlug,
  subCategorySlug,
  filters,
  setFilters,
}) => {
  const [dynamicFilters, setDynamicFilters] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* ==========================================
      Load Filters
  ========================================== */

useEffect(() => {
  if (!categorySlug && !subCategorySlug) {
    setDynamicFilters([]);
    setLoading(false);
    return;
  }
  // ... API call yaha ho jaati hai

    const fetchFilters = async () => {
      try {
        setLoading(true);

 const res = await getProductFilters({
  category: categorySlug,
  menuGroup: menuGroupSlug,
  subCategory: subCategorySlug,
});

setDynamicFilters(res.filters || []);
      } catch (error) {
        console.error(error);

        setDynamicFilters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
 }, [
  categorySlug,
  menuGroupSlug,
  subCategorySlug,
]);

  /* ==========================================
      Filter Change
  ========================================== */

  const handleFilterChange = (
    key,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ==========================================
      Clear Filters
  ========================================== */

  const clearFilters = () => {
    setFilters({});
  };

  if (loading) {
    return (
<aside
  className="
    bg-white
    rounded-2xl
    shadow
    p-6
    h-fit
    lg:sticky
    lg:top-28
  "
>
        <h2 className="text-2xl font-bold mb-6">
          Filters
        </h2>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse"
            >
              <div className="h-5 w-32 bg-gray-200 rounded mb-3" />

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }
    return (
<aside
  className="
    bg-white
    rounded-2xl
    shadow
    p-6
    h-fit
    lg:sticky
    lg:top-28
  "
>

      {/* ===============================
          Header
      =============================== */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:text-red-600 hover:underline transition"
        >
          Clear
        </button>

      </div>

      {/* ===============================
          Empty State
      =============================== */}

      {dynamicFilters.length === 0 ? (
        <div className="text-center py-8">

          <p className="text-gray-500">
            No filters available.
          </p>

        </div>
      ) : (

        <div className="space-y-8">

          {dynamicFilters
            .sort(
              (a, b) =>
                (a.sortOrder || 0) -
                (b.sortOrder || 0)
            )
            .map((filter) => (

              <div
               // NEW
key={filter.key}
                className="border-b border-gray-100 pb-6 last:border-none last:pb-0"
              >

                <DynamicFilter
                  filter={filter}
                  value={
                    filters[filter.key]
                  }
                  onChange={(value) =>
                    handleFilterChange(
                      filter.key,
                      value
                    )
                  }
                />

              </div>

            ))}

        </div>

      )}
          </aside>
  );
};

export default CategorySidebar;