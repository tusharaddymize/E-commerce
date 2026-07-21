import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";

const RecentlyViewed = ({ currentProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!currentProduct) return;

    let viewed = JSON.parse(
      localStorage.getItem("recentProducts")
    ) || [];

    viewed = viewed.filter(
      (item) => item._id !== currentProduct._id
    );

    viewed.unshift(currentProduct);

    viewed = viewed.slice(0, 8);

    localStorage.setItem(
      "recentProducts",
      JSON.stringify(viewed)
    );

    setProducts(
      viewed.filter(
        (item) => item._id !== currentProduct._id
      )
    );
  }, [currentProduct]);

  if (!products.length) return null;

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default RecentlyViewed;