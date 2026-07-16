import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-bold text-green-600">
        404
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;