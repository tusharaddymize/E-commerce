import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Hamburger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
      lg:hidden
      flex
      items-center
      justify-center
      text-3xl
      text-[#355E3B]
      hover:text-orange-500
      transition
      "
    >
      <HiOutlineMenuAlt3 />
    </button>
  );
};

export default Hamburger;