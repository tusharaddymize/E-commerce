import { FiCamera } from "react-icons/fi";

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-6">

      <div className="relative">

        <img
          src={
            user?.avatar ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(user?.name || "User") +
              "&background=16a34a&color=fff"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
        />

        <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700">
          <FiCamera />
        </button>

      </div>

      <div className="flex-1">

        <h1 className="text-3xl font-bold">
          {user?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {user?.email}
        </p>

        <span className="inline-block mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          Verified Customer
        </span>

      </div>

    </div>
  );
};

export default ProfileHeader;