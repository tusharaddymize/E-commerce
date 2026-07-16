import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductCard from "../components/product-card/ProductCard";

import { searchProducts } from "../services/productService";

const SearchResults = () => {

  const { keyword } = useParams();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProducts();

  }, [keyword]);

  const loadProducts = async () => {

    try {

      setLoading(true);

      const data =
        await searchProducts(keyword, 100);

      setProducts(data.products);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return (

      <>
        <Header />

        <div className="max-w-7xl mx-auto py-20">

          <h2 className="text-3xl font-bold mb-10">

            Searching...

          </h2>

          <div
            className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            "
          >

            {[...Array(8)].map((_, i) => (

              <div
                key={i}
                className="
                h-[420px]
                bg-gray-200
                animate-pulse
                rounded-2xl
                "
              />

            ))}

          </div>

        </div>

        <Footer />

      </>

    );

  }



    return (
    <>
      <Header />

      <main className="bg-gray-100 min-h-screen">

        <div className="max-w-[1450px] mx-auto px-5 py-10">

          {/* Heading */}

          <div className="mb-10">

            <h1 className="text-4xl font-bold">

              Search Results

            </h1>

            <p className="text-gray-500 mt-2">

              Keyword :
              <span className="font-semibold text-[#355E3B]">
                {" "}
                {keyword}
              </span>

            </p>

            <p className="mt-2 text-gray-600">

              {products.length} Products Found

            </p>

          </div>

          {/* No Result */}

          {products.length === 0 ? (

            <div
              className="
              bg-white
              rounded-2xl
              shadow
              p-20
              text-center
              "
            >

              <h2 className="text-3xl font-bold">

                No Products Found

              </h2>

              <p className="mt-4 text-gray-500">

                Try searching with another keyword.

              </p>

            </div>

          ) : (

            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-6
              "
            >

              {products.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          )}

        </div>

      </main>

      <Footer />

    </>
  );

};

export default SearchResults;