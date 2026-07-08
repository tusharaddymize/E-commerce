import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Hamburger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
className="text-3xl text-[#355E3B] hover:text-[#e67e22] transition"
    >
      <HiOutlineMenuAlt3 />
    </button>
  );
};

export default Hamburger;