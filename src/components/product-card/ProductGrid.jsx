import { products } from "./productData";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section className="bg-white pt-20 pb-16">
      <div className="max-w-[1450px] mx-auto px-6">

        {/* Heading */}
        <div className="flex justify-between items-center mb-14">
          <div className="w-24 "></div>

          <h2 className="text-5xl font-bold text-center ">
            Featured Products
          </h2>

          <button className="text-[#355E3B] font-semibold text-xl hover:underline">
            View All
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductGrid;