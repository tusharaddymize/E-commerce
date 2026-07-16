import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "../../context/WishlistContext";

const WishlistIcon = () => {
  const { wishlist } = useWishlist();

  return (
    <Link
      to="/wishlist"
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
    >
      <FiHeart className="text-[22px]" />

      {wishlist.length > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;