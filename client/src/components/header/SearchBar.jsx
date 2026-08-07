import { useEffect, useRef, useState } from "react";

import {
  FiSearch,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import useSearch from "../../hooks/useSearch";

const trending = [
  "Shirt",
  "Shoes",
  "Kurti",
  "Laptop",
  "iPhone",
  "Watch",
  "Headphones",
  "Saree",
];

const SearchBar = () => {
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [recent, setRecent] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("recentSearch")
        ) || []
      );
    } catch {
      return [];
    }
  });

  // ==========================================
  // MongoDB Live Search
  // ==========================================

  const {
    products = [],
    loading,
  } = useSearch(search);

  // ==========================================
  // Close Dropdown On Outside Click
  // ==========================================

  useEffect(() => {
    const close = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      close
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        close
      );
    };
  }, []);

  // ==========================================
  // Save Recent Search
  // ==========================================

  const saveSearch = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    let data = [
      trimmedValue,

      ...recent.filter(
        (item) =>
          item.toLowerCase() !==
          trimmedValue.toLowerCase()
      ),
    ];

    data = data.slice(0, 6);

    setRecent(data);

    localStorage.setItem(
      "recentSearch",
      JSON.stringify(data)
    );

    setOpen(false);

    navigate(
      `/search/${encodeURIComponent(
        trimmedValue
      )}`
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      {/* ====================================== */}
      {/* Search Box */}
      {/* ====================================== */}

      <div
        className="
          flex
          items-center
          border
          border-gray-300
          rounded-xl
          overflow-hidden
          bg-white
          transition-colors
          duration-300

          focus-within:border-[var(--primary-color)]
          focus-within:ring-1
          focus-within:ring-[var(--primary-color)]
        "
      >
        <input
          type="text"
          value={search}
          onFocus={() => setOpen(true)}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveSearch(search);
            }
          }}
          placeholder="Search products..."
          className="
            flex-1
            min-w-0
            h-12
            px-4
            outline-none
            bg-transparent
            text-gray-900
            placeholder:text-gray-400
          "
        />

        {/* Search Button */}

        <button
          type="button"
          onClick={() =>
            saveSearch(search)
          }
          aria-label="Search"
          className="
            w-14
            h-12
            flex
            items-center
            justify-center
            flex-shrink-0
            text-white

            bg-[var(--button-color)]

            transition-all
            duration-300

            hover:brightness-90
            active:scale-95
          "
        >
          <FiSearch size={20} />
        </button>
      </div>

      {/* ====================================== */}
      {/* Search Dropdown */}
      {/* ====================================== */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            mt-2

            bg-white

            rounded-[var(--theme-radius)]

            shadow-2xl

            border
            border-gray-200

            z-50

            max-h-[500px]
            overflow-y-auto
          "
        >
          {/* ================================== */}
          {/* Live Products */}
          {/* ================================== */}

          {search.trim() && (
            <div className="border-b border-gray-200">
              <div className="px-5 py-4">
                <h3 className="font-semibold mb-3 text-gray-900">
                  Products
                </h3>

                {/* Loading */}

                {loading && (
                  <p className="text-gray-500">
                    Searching...
                  </p>
                )}

                {/* Empty */}

                {!loading &&
                  products.length === 0 && (
                    <p className="text-gray-400">
                      No Products Found
                    </p>
                  )}

                {/* Products */}

                {!loading &&
                  products.map(
                    (product, index) => {
                      const productId =
                        product?._id ||
                        product?.id;

                      return (
                        <Link
                          key={
                            productId
                              ? `${productId}-${index}`
                              : `search-product-${index}`
                          }
                          to={`/product/${productId}`}
                          onClick={() =>
                            setOpen(false)
                          }
                          className="
                            flex
                            items-center
                            gap-4
                            py-3
                            px-2
                            rounded-xl

                            hover:bg-gray-100

                            transition
                          "
                        >
                          <img
                            src={
                              product.thumbnail ||
                              product.images?.[0]
                            }
                            alt={
                              product.title ||
                              "Product"
                            }
                            className="
                              w-14
                              h-14
                              rounded-lg
                              object-cover
                              flex-shrink-0
                            "
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium line-clamp-1 text-gray-900">
                              {product.title}
                            </h4>

                            <p className="text-sm text-gray-500 line-clamp-1">
                              {product.brand}
                            </p>
                          </div>

                          <span
                            className="
                              font-bold
                              flex-shrink-0
                              text-[var(--primary-color)]
                            "
                          >
                            ₹{product.price}
                          </span>
                        </Link>
                      );
                    }
                  )}

                {/* View All */}

                {products.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      saveSearch(search)
                    }
                    className="
                      w-full
                      mt-4
                      py-3

                      text-white
                      font-medium

                      bg-[var(--button-color)]

                      rounded-[var(--theme-radius)]

                      transition-all
                      duration-300

                      hover:brightness-90
                      active:scale-[0.99]
                    "
                  >
                    View All Results
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================================== */}
          {/* Recent Searches */}
          {/* ================================== */}

          {!search.trim() &&
            recent.length > 0 && (
              <div className="border-b border-gray-200 px-5 py-4">
                <h3 className="font-semibold mb-3 text-gray-900">
                  Recent Searches
                </h3>

                {recent.map(
                  (item, index) => (
                    <button
                      type="button"
                      key={`${item}-${index}`}
                      onClick={() =>
                        saveSearch(item)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        w-full
                        py-2

                        text-gray-700

                        hover:text-[var(--primary-color)]

                        transition-colors
                        duration-200
                      "
                    >
                      <FiClock />

                      {item}
                    </button>
                  )
                )}
              </div>
            )}

          {/* ================================== */}
          {/* Trending Searches */}
          {/* ================================== */}

          {!search.trim() && (
            <div className="px-5 py-4">
              <h3 className="font-semibold mb-3 text-gray-900">
                Trending Searches
              </h3>

              {trending.map(
                (item, index) => (
                  <button
                    type="button"
                    key={`${item}-${index}`}
                    onClick={() =>
                      saveSearch(item)
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      w-full
                      py-2

                      text-gray-700

                      hover:text-[var(--primary-color)]

                      transition-colors
                      duration-200
                    "
                  >
                    <FiTrendingUp />

                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;