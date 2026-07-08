import BestSellingCard from "./BestSellingCard";
import { bestSellingProducts } from "./bestSellingData";

const BestSellingSection = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-[1450px] mx-auto px-8">

<div className="relative mb-12">

  <h2 className="text-4xl font-bold text-center">
    Best Selling Products
  </h2>

  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#355E3B] font-semibold hover:underline">
    View All
  </button>

</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {bestSellingProducts.map((product) => (
            <BestSellingCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default BestSellingSection;