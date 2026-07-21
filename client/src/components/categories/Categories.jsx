import { categories } from "./categoryData";
import CategoryCard from "./CategoryCard";


const Categories = () => {
  return (
    <section className="w-full bg-white pt-14 pb-8">
      <div className="max-w-[1450px] mx-auto px-6">
        <div
          className="
            flex
            gap-6
            overflow-x-auto
            lg:grid
            lg:grid-cols-10
            scrollbar-hide
          "
        >
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;