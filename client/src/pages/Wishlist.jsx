import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
const Wishlist = () => {
  const { wishlist, removeWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

if (wishlist.length === 0) {
  return <EmptyWishlist />;
}
  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 text-[#355E3B] font-semibold hover:underline"
      >
        ← Back to Home
      </Link>

      <h2 className="text-4xl font-bold mb-10">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* Image */}
            <div className="w-full h-80 bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">

              <h3 className="text-lg font-semibold">
                {product.title}
              </h3>

              <p className="text-2xl font-bold text-[#355E3B] mt-2">
                ₹{product.price}
              </p>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => removeWishlist(product.id)}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>

<button
  onClick={() => {
    addToCart(product);          // Cart me add
    removeWishlist(product.id);  // Wishlist se remove
    navigate("/cart");           // Cart page open
  }}
  className="flex-1 bg-[#355E3B] text-white py-3 rounded-lg hover:bg-[#27452d] transition"
>
  Buy Now
</button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Wishlist;