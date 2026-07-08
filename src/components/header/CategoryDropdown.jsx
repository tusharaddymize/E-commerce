import { categories } from "./headerData";

const CategoryDropdown = ({ open }) => {
  if (!open) return null;

  return (
    <div
      className="
        absolute
        top-full
        left-0
        mt-2
        w-80
        bg-white
        rounded-2xl
        shadow-2xl
        border
        border-gray-200
        overflow-hidden
        z-[999]
      "
    >
      {categories.map((item) => (
        <button
          key={item.id}
          className="
            w-full
            flex
            items-center
            gap-4
            px-5
            py-4
            hover:bg-gray-100
            transition-all
            text-left
          "
        >
          <span className="text-2xl">
            {item.icon}
          </span>

          <span className="text-gray-700 font-medium">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryDropdown;