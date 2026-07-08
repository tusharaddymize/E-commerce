import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import CategoryDropdown from "./CategoryDropdown";

const CategoryButton = () => {
  const [open, setOpen] = useState(false);

  return (
   <div
  className="relative hidden lg:block z-50"
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
>
      <button
        className="
          flex
          items-center
          gap-3
          bg-[#355E3B]
          text-white
          px-5
          py-3
          rounded-xl
          hover:bg-[#2b4d30]
          transition-all
        "
      >
        <span className="font-medium">
          All Categories
        </span>

        <FaChevronDown
          size={12}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <CategoryDropdown open={open} />
    </div>
  );
};

export default CategoryButton;