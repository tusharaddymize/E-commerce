import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
const WishlistIcon = () => {
  const { wishlist } = useWishlist();

  return (
    <Link
      to="/wishlist"
      className="relative flex items-center gap-2"
    >
      <div className="relative">
        <FiHeart size={22} />

        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </div>

      <span className="hidden xl:block text-sm">
        Wishlist
      </span>
    </Link>
  );
};

export default WishlistIcon;