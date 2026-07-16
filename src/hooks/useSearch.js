import { useEffect, useState } from "react";

import {
  searchProducts,
} from "../services/productService";

const useSearch = (keyword) => {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!keyword.trim()) {

      setProducts([]);

      return;

    }

    const timer = setTimeout(async () => {

      try {

        setLoading(true);

        const data =
          await searchProducts(keyword);

        setProducts(data.products);

      } catch (err) {

        console.log(err);

      }

      setLoading(false);

    }, 400);

    return () =>
      clearTimeout(timer);

  }, [keyword]);

  return {

    products,

    loading,

  };

};

export default useSearch;