import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div
      className="
        flex
        items-center
        w-full
        border
        border-gray-200
        rounded-xl
        overflow-hidden
        bg-white
      "
    >
      <input
        type="text"
        placeholder="Search for products, brands and more..."
        className="
          flex-1
          pl-10
          pr-4
          py-3
          outline-none
          text-sm
          text-gray-700
          placeholder:text-gray-400
        "
      />

      <button
        className="
          bg-[#355E3B]
          w-14
          h-12
          flex
          items-center
          justify-center
          text-white
          hover:bg-[#27452d]
        "
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;