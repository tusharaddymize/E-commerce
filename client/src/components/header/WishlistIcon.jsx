import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";

const WishlistIcon = () => {
  const { wishlist = [] } = useWishlist();

  const wishlistCount = wishlist.length;

  return (
    <Link
      to="/wishlist"
      aria-label={`Wishlist (${wishlistCount})`}
      className="
        relative

        flex
        items-center
        justify-center

        w-10
        h-10

        rounded-full

        text-gray-800

        hover:bg-gray-100
        hover:text-[var(--primary-color)]

        transition-all
        duration-300
      "
    >
      {/* Heart Icon */}

      <FiHeart className="text-[22px]" />

      {/* Wishlist Count */}

      {wishlistCount > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1

            min-w-[18px]
            h-[18px]

            px-1

            rounded-full

            bg-[var(--accent-color)]

            text-white
            text-[10px]
            font-bold

            flex
            items-center
            justify-center

            transition-colors
            duration-300
          "
        >
          {wishlistCount > 99
            ? "99+"
            : wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;