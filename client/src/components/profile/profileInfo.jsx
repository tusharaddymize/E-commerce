const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Full Name</p>
          <h3 className="font-semibold mt-1">
            {user?.name}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h3 className="font-semibold mt-1">
            {user?.email}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <h3 className="font-semibold mt-1">
            {user?.phone || "Not Added"}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Member Since
          </p>
          <h3 className="font-semibold mt-1">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Recently Joined"}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default ProfileInfo;