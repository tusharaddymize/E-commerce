import {
  createContext,
  useEffect,
  useState,
} from "react";

import { getProducts } from "../services/productService";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  // ===========================
  // Load Products
  // ===========================

  const loadProducts = async (
    pageNumber = 1,
    reset = false
  ) => {

    if (!hasMore && !reset) return;

    try {

      setLoading(true);

      const data = await getProducts({
        page: pageNumber,
        limit: 20,
      });

      if (reset) {

        setProducts(data.products);

      } else {

        setProducts((prev) => [
          ...prev,
          ...data.products,
        ]);

      }

      if (
        pageNumber >= data.totalPages
      ) {

        setHasMore(false);

      } else {

        setHasMore(true);

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // First Load
  // ===========================

  useEffect(() => {

    loadProducts(1, true);

  }, []);

  // ===========================
  // Load More
  // ===========================

  const loadMore = () => {

    if (loading || !hasMore) return;

    const nextPage = page + 1;

    setPage(nextPage);

    loadProducts(nextPage);

  };

  return (

    <ProductContext.Provider
      value={{

        products,

        loading,

        hasMore,

        loadMore,

        loadProducts,

      }}
    >

      {children}

    </ProductContext.Provider>

  );

};

export default ProductProvider;