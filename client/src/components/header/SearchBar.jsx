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

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [recent, setRecent] =
    useState(() => {

      return (
        JSON.parse(
          localStorage.getItem(
            "recentSearch"
          )
        ) || []
      );

    });

  // =============================
  // MongoDB Live Search
  // =============================

  const {
    products,
    loading,
  } = useSearch(search);

  // =============================
  // Close Dropdown
  // =============================

  useEffect(() => {

    const close = (e) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(
          e.target
        )
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

  // =============================
  // Save Recent Search
  // =============================

  const saveSearch = (value) => {

    if (!value.trim()) return;

    let data = [

      value,

      ...recent.filter(
        (item) =>
          item.toLowerCase() !==
          value.toLowerCase()
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
      `/search/${value}`
    );

  };
    return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      {/* Search Box */}

      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">

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
          className="flex-1 h-12 px-4 outline-none"
        />

        <button
          onClick={() => saveSearch(search)}
          className="w-14 h-12 bg-[#355E3B] text-white flex items-center justify-center hover:bg-[#27452d] transition"
        >
          <FiSearch size={20} />
        </button>

      </div>

      {/* Dropdown */}

      {open && (

        <div
          className="
          absolute
          left-0
          right-0
          mt-2
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-gray-200
          z-50
          max-h-[500px]
          overflow-y-auto
          "
        >

          {/* Live Products */}

          {search.trim() && (

            <div className="border-b">

              <div className="px-5 py-4">

                <h3 className="font-semibold mb-3">

                  Products

                </h3>

                {loading && (

                  <p className="text-gray-500">

                    Searching...

                  </p>

                )}

                {!loading &&
                  products.length === 0 && (

                  <p className="text-gray-400">

                    No Products Found

                  </p>

                )}

                {!loading &&
                  products.map((product) => (

                  <Link
                    key={
                      product._id ||
                      product.id
                    }
                    to={`/product/${
                      product._id ||
                      product.id
                    }`}
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                    flex
                    items-center
                    gap-4
                    py-3
                    hover:bg-gray-100
                    px-2
                    rounded-xl
                    transition
                    "
                  >

                    <img
                      src={
                        product.thumbnail ||
                        product.images?.[0]
                      }
                      alt={product.title}
                      className="
                      w-14
                      h-14
                      rounded-lg
                      object-cover
                      "
                    />

                    <div className="flex-1">

                      <h4 className="font-medium line-clamp-1">

                        {product.title}

                      </h4>

                      <p className="text-sm text-gray-500">

                        {product.brand}

                      </p>

                    </div>

                    <span className="font-bold text-[#355E3B]">

                      ₹{product.price}

                    </span>

                  </Link>

                ))}

                {products.length > 0 && (

                  <button
                    onClick={() =>
                      saveSearch(search)
                    }
                    className="
                    w-full
                    mt-4
                    py-3
                    rounded-xl
                    bg-[#355E3B]
                    text-white
                    hover:bg-[#27452d]
                    transition
                    "
                  >

                    View All Results

                  </button>

                )}

              </div>

            </div>

          )}

          {/* Recent */}

          {!search.trim() &&
            recent.length > 0 && (

            <div className="border-b px-5 py-4">

              <h3 className="font-semibold mb-3">

                Recent Searches

              </h3>

              {recent.map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    saveSearch(item)
                  }
                  className="
                  flex
                  items-center
                  gap-3
                  w-full
                  py-2
                  hover:text-[#355E3B]
                  transition
                  "
                >

                  <FiClock />

                  {item}

                </button>

              ))}

            </div>

          )}

          {/* Trending */}

          {!search.trim() && (

            <div className="px-5 py-4">

              <h3 className="font-semibold mb-3">

                Trending Searches

              </h3>

              {trending.map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    saveSearch(item)
                  }
                  className="
                  flex
                  items-center
                  gap-3
                  w-full
                  py-2
                  hover:text-[#355E3B]
                  transition
                  "
                >

                  <FiTrendingUp />

                  {item}

                </button>

              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );

};

export default SearchBar;