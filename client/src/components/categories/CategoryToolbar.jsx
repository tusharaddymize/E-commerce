import SortDropdown from "./SortDropdown";

const CategoryToolbar = ({
  filters,
  setFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">

      <h2 className="text-lg font-semibold">
        Products
      </h2>

      <div className="flex items-center gap-3">

        <span className="text-gray-500">
          Sort By
        </span>

        <SortDropdown
          value={filters.sort}
          onChange={(sort) =>
            setFilters((prev) => ({
              ...prev,
              sort,
            }))
          }
        />

      </div>

    </div>
  );
};

export default CategoryToolbar;