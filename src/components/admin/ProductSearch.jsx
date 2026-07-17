import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const ProductSearch = ({
  value = "",
  onSearch,
  placeholder = "Search products...",
}) => {
  const [keyword, setKeyword] = useState(value);

  // Sync external value
  useEffect(() => {
    setKeyword(value);
  }, [value]);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(keyword.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, onSearch]);

  // Clear Search
  const handleClear = () => {
    setKeyword("");
    onSearch("");
  };

  // Enter Key Search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(keyword.trim());
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">

        {/* Search Icon */}
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        {/* Input */}
        <input
          type="text"
          value={keyword}
          placeholder={placeholder}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            py-3
            pl-10
            pr-20
            text-sm
            shadow-sm
            transition
            outline-none
            focus:border-green-600
            focus:ring-4
            focus:ring-green-100
          "
        />

        {/* Clear */}
        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="
              absolute
              right-12
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition
              hover:text-red-500
            "
          >
            <X size={18} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="button"
          onClick={() => onSearch(keyword.trim())}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            rounded-lg
            bg-green-600
            p-2
            text-white
            transition
            hover:bg-green-700
          "
        >
          <Search size={15} />
        </button>

      </div>
    </div>
  );
};

export default ProductSearch;