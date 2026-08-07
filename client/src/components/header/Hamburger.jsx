import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Hamburger = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      className="
        lg:hidden

        flex
        items-center
        justify-center

        text-3xl

        text-[var(--primary-color)]

        hover:text-[var(--accent-color)]

        transition-colors
        duration-300
      "
    >
      <HiOutlineMenuAlt3 />
    </button>
  );
};

export default Hamburger;