import { useState } from "react";
import { useParams } from "react-router-dom";

import CategoryBanner from "../components/categories/CategoryBanner";
import CategorySidebar from "../components/categories/CategorySidebar";
import CategoryToolbar from "../components/categories/CategoryToolbar";
import CategoryGrid from "../components/categories/CategoryGrid";
const CategoryPage = () => {
  const { slug } = useParams();

  const [filters, setFilters] = useState({
    brand: "",
    maxPrice: 100000,
    rating: "",
    sort: "latest",
  });

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-[1450px] mx-auto px-5 py-8">

        <CategoryBanner title={slug} />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          <CategorySidebar
            filters={filters}
            setFilters={setFilters}
          />

          <section>

            <CategoryToolbar
              filters={filters}
              setFilters={setFilters}
            />

            <CategoryGrid
              category={slug}
              filters={filters}
            />

          </section>

        </div>

      </div>
    </main>
  );
};

export default CategoryPage;