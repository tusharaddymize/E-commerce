import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const EmptyWishlist = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="bg-white rounded-3xl shadow-lg border max-w-lg w-full p-10 text-center">

        {/* Icon */}
        <div className="w-28 h-28 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
          <FaHeart className="text-5xl text-pink-500" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-black mt-8">
          Your Wishlist is Empty
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4 leading-7">
          Save your favourite products here and shop them anytime.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center mt-10 w-full h-14 rounded-2xl bg-[#355E3B] text-white font-semibold text-lg hover:bg-[#27452d] transition"
        >
          Explore Products
        </Link>

      </div>
    </section>
  );
};

export default EmptyWishlist;