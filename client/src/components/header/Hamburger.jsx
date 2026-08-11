import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Hamburger = ({ onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("HAMBURGER BUTTON CLICK");

    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open menu"
      className="
        flex
        lg:hidden

        items-center
        justify-center

        w-10
        h-10

        flex-shrink-0

        rounded-lg

        text-2xl
        sm:text-3xl

        text-gray-800

        bg-transparent

        cursor-pointer

        hover:bg-gray-100

        active:scale-95

        transition-all
        duration-200

        relative
        z-[200]
      "
    >
      <HiOutlineMenuAlt3 />
    </button>
  );
};

export default Hamburger;