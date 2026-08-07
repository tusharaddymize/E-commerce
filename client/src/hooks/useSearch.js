import { useEffect, useState } from "react";

import {
  getProducts,
} from "../services/productService";

const useSearch = (keyword) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      setProducts([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await getProducts({
          search: keyword,
          limit: 8,
        });

        setProducts(data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  return {
    products,
    loading,
  };
};

export default useSearch;