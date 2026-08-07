import { useEffect, useMemo, useState } from "react";

import ProductCard from "../product-card/ProductCard";

import { getProducts } from "../../services/productService";

const CategoryGrid = ({
  categorySlug,
  menuGroupSlug,
  subCategorySlug,
  filters,
}) => {
  // ==========================================
  // State
  // ==========================================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Load Products
  // ==========================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const params = {
          category: categorySlug,
          menuGroup: menuGroupSlug,
          subCategory: subCategorySlug,
          ...filters,
        };

        // Remove empty values
        Object.keys(params).forEach((key) => {
          if (
            params[key] === "" ||
            params[key] === undefined ||
            params[key] === null
          ) {
            delete params[key];
          }
        });

const res = await getProducts(params);

setProducts(
    res?.products ||
    res?.data?.products ||
    []
);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [
    categorySlug,
    menuGroupSlug,
    subCategorySlug,
    filters,
  ]);

  // ==========================================
  // Sorting
  // ==========================================

  const sortedProducts = useMemo(() => {
    const data = [...products];

    switch (filters?.sort || "latest") {
      case "priceLow":
        data.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        data.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        data.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;

      case "latest":
      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return data;
  }, [products, filters]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-20 text-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading Products...
        </p>
      </div>
    );
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (sortedProducts.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-20 text-center shadow">
        <h2 className="text-2xl font-bold">
          No Products Found
        </h2>

        <p className="mt-3 text-gray-500">
          Try another category or filter.
        </p>
      </div>
    );
  }
    // ==========================================
  // Products Grid
  // ==========================================

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-6
        md:grid-cols-3
        xl:grid-cols-4
      "
    >
      {sortedProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;