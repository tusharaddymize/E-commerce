import ProductCard from "../product-card/ProductCard";
import useProducts from "../../hooks/useProducts";

const CategoryGrid = ({ category }) => {

  const { products, loading } = useProducts();

  const filteredProducts = products.filter((product) => {

    if (!category) return true;

    return (
      product.category?.toLowerCase() ===
      category.toLowerCase()
    );

  });

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-20 text-center">
        Loading Products...
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-20 text-center">

        <h2 className="text-2xl font-bold">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-3">
          Try another category.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      gap-6
      "
    >
      {filteredProducts.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
        />

      ))}
    </div>
  );

};

export default CategoryGrid;