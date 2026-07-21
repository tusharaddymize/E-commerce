import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <Link
        to="/orders"
        className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700"
      >
        My Orders
      </Link>

      <Link
        to="/wishlist"
        className="bg-pink-500 text-white rounded-xl p-6 text-center hover:bg-pink-600"
      >
        Wishlist
      </Link>

      <Link
        to="/edit-profile"
        className="bg-blue-600 text-white rounded-xl p-6 text-center hover:bg-blue-700"
      >
        Edit Profile
      </Link>

    </div>
  );
};

export default QuickActions;