import {
  useMemo,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductCard from "../components/product-card/ProductCard";

import {
  useProductsQuery,
} from "../hooks/useProductQueries";

// ==========================================
// Search Results
// ==========================================

const SearchResults = () => {
  const {
    keyword = "",
  } = useParams();

  // ========================================
  // Clean Keyword
  // ========================================

  const searchKeyword =
    useMemo(
      () =>
        decodeURIComponent(
          keyword || ""
        ).trim(),
      [keyword]
    );

  // ========================================
  // Query
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useProductsQuery(
    {
      search:
        searchKeyword,

      limit: 100,
    },
    {
      enabled:
        Boolean(searchKeyword),
    }
  );

  // ========================================
  // Products
  // ========================================

  const products =
    data?.products ||
    data?.data?.products ||
    [];

  // ========================================
  // Loading
  // ========================================

  if (isLoading) {
    return (
      <>
        <Header />

        <main
          className="
            min-h-screen
            bg-gray-100
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              px-5
              py-10
            "
          >
            <h2
              className="
                mb-10
                text-3xl
                font-bold
              "
            >
              Searching...
            </h2>

            <div
              className="
                grid
                grid-cols-2
                gap-6
                md:grid-cols-3
                lg:grid-cols-4
              "
            >
              {Array.from({
                length: 8,
              }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="
                      h-[420px]
                      animate-pulse
                      rounded-2xl
                      bg-gray-200
                    "
                  />
                )
              )}
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (error) {
    return (
      <>
        <Header />

        <main
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-gray-100
            px-5
          "
        >
          <div
            className="
              rounded-2xl
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >
              Search Failed
            </h2>

            <p
              className="
                mt-3
                text-gray-500
              "
            >
              Please try again later.
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ========================================
  // Page
  // ========================================

  return (
    <>
      <Header />

      <main
        className="
          min-h-screen
          bg-gray-100
        "
      >
        <div
          className="
            mx-auto
            max-w-[1450px]
            px-5
            py-10
          "
        >
          {/* Heading */}

          <div className="mb-10">
            <h1
              className="
                text-4xl
                font-bold
              "
            >
              Search Results
            </h1>

            <p
              className="
                mt-2
                text-gray-500
              "
            >
              Keyword:

              <span
                className="
                  ml-2
                  font-semibold
                  text-[#355E3B]
                "
              >
                {searchKeyword}
              </span>
            </p>

            <p
              className="
                mt-2
                text-gray-600
              "
            >
              {products.length}{" "}
              Products Found
            </p>

            {isFetching && (
              <p
                className="
                  mt-1
                  text-sm
                  text-gray-400
                "
              >
                Updating results...
              </p>
            )}
          </div>

          {/* No Result */}

          {products.length ===
          0 ? (
            <div
              className="
                rounded-2xl
                bg-white
                p-20
                text-center
                shadow
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                No Products Found
              </h2>

              <p
                className="
                  mt-4
                  text-gray-500
                "
              >
                Try searching with
                another keyword.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-2
                gap-6
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
              "
            >
              {products.map(
                (product) => (
                  <ProductCard
                    key={
                      product._id
                    }
                    product={
                      product
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SearchResults;