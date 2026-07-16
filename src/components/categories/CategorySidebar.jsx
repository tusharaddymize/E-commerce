import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const CategorySidebar = ({
  filters,
  setFilters,
}) => {
  const clearFilters = () => {
    setFilters({
      brand: "",
      maxPrice: 100000,
      rating: "",
      sort: "latest",
    });
  };

  return (
    <aside className="bg-white rounded-2xl shadow p-6 sticky top-32 h-fit">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>

      </div>

      <div className="space-y-8">

        <BrandFilter
          value={filters.brand}
          onChange={(brand) =>
            setFilters((prev) => ({
              ...prev,
              brand,
            }))
          }
        />

        <PriceFilter
          value={filters.maxPrice}
          onChange={(price) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: price,
            }))
          }
        />

        <RatingFilter
          value={filters.rating}
          onChange={(rating) =>
            setFilters((prev) => ({
              ...prev,
              rating,
            }))
          }
        />

      </div>

    </aside>
  );
};

export default CategorySidebar;