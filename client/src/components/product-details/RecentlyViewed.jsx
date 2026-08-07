import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";

const RecentlyViewed = ({
  currentProduct,
}) => {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    if (!currentProduct) return;

    let viewed =
      JSON.parse(
        localStorage.getItem(
          "recentProducts"
        )
      ) || [];

    // Current product remove
    viewed = viewed.filter(
      (item) =>
        item._id !== currentProduct._id
    );

    // Current product first add
    viewed.unshift(currentProduct);

    // Maximum 8 products
    viewed = viewed.slice(0, 8);

    localStorage.setItem(
      "recentProducts",
      JSON.stringify(viewed)
    );

    // Current product ko section me
    // show nahi karna
    setProducts(
      viewed.filter(
        (item) =>
          item._id !==
          currentProduct._id
      )
    );
  }, [currentProduct]);

  if (!products.length) return null;

  return (
    <section
      className="
        w-full

        mt-10
        sm:mt-14
        lg:mt-20
      "
    >
      {/* ====================================== */}
      {/* Heading */}
      {/* ====================================== */}

      <div
        className="
          mb-4
          sm:mb-6
          lg:mb-8
        "
      >
        <h2
          className="
            text-xl
            sm:text-2xl
            lg:text-3xl

            font-bold
            text-gray-900
          "
        >
          Recently Viewed
        </h2>
      </div>

      {/* ====================================== */}
      {/* Products */}
      {/* ====================================== */}

      <div
        className="
          grid

          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4

          gap-2
          sm:gap-3
          md:gap-4
          lg:gap-6

          w-full
        "
      >
        {products.map((product) => (
          <div
            key={
              product._id ||
              product.id
            }
            className="
              w-full
              min-w-0
            "
          >
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;