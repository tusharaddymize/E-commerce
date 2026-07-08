import { FiHeart } from "react-icons/fi";

const WishlistIcon = () => {
  return (
    <button className="flex items-center gap-2">
      <FiHeart size={22} />

      <span className="hidden xl:block text-sm">
        Wishlist
      </span>
    </button>
  );
};

export default WishlistIcon;