import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  getUserById,
} from "../../services/userService";

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================================================
  // Load User
  // ======================================================

  const loadUser = async () => {
    try {
      setLoading(true);

      const data = await getUserById(id);

      setUser(data.user);
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to load user:", error);

      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Load User On Page Load / ID Change
  // ======================================================

  useEffect(() => {
    loadUser();
  }, [id]);

  // ======================================================
  // Loading State
  // ======================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Loading...
        </p>
      </div>
    );
  }

  // ======================================================
  // User Not Found
  // ======================================================

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          User not found.
        </p>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ==================================================
          Sidebar
      ================================================== */}

      <AdminSidebar />

      {/* ==================================================
          Main Content
      ================================================== */}

      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <AdminNavbar />

        <main className="p-4 sm:p-6">

          {/* ==================================================
              Back Button
          ================================================== */}

          <button
            onClick={() => navigate("/admin/users")}
            className="
              flex
              items-center
              gap-2
              mb-6
              text-green-700
              hover:text-green-900
              font-medium
              transition-colors
            "
          >
            <ArrowLeft size={20} />
            Back to Users
          </button>

          {/* ==================================================
              User Profile
          ================================================== */}

          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-6">

            <div className="flex flex-col md:flex-row gap-5 sm:gap-6">

              {/* User Avatar */}

              <div className="flex justify-center md:justify-start">
                <img
                  src={
                    user.avatar ||
                    "https://via.placeholder.com/150"
                  }
                  alt={user.name || "User"}
                  className="
                    w-28
                    h-28
                    sm:w-32
                    sm:h-32
                    rounded-full
                    object-cover
                    border
                  "
                />
              </div>

              {/* User Information */}

              <div className="flex-1 text-center md:text-left">

                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                  {user.name}
                </h2>

                <p className="text-gray-600 mb-1 break-words">
                  {user.email}
                </p>

                <p className="text-gray-600 mb-1">
                  {user.phone || "No Phone"}
                </p>

                <p className="text-gray-600 mb-1">
                  Role:
                  <span className="font-semibold ml-2">
                    {user.role}
                  </span>
                </p>

                <p className="text-gray-600">
                  Member Since:
                  <span className="ml-2">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </span>
                </p>

              </div>

            </div>

          </div>

          {/* ==================================================
              Statistics
              Total Spending Removed
          ================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

            {/* Total Orders */}

            <div className="bg-white rounded-xl shadow p-5 sm:p-6">

              <h3 className="text-gray-500 text-base sm:text-lg">
                Total Orders
              </h3>

              <p className="text-3xl font-bold mt-2 text-gray-900">
                {stats?.totalOrders || 0}
              </p>

            </div>

            {/* Saved Addresses */}

            <div className="bg-white rounded-xl shadow p-5 sm:p-6">

              <h3 className="text-gray-500 text-base sm:text-lg">
                Saved Addresses
              </h3>

              <p className="text-3xl font-bold mt-2 text-gray-900">
                {user.addresses?.length || 0}
              </p>

            </div>

          </div>

          {/* ==================================================
              Address List
          ================================================== */}

          <div className="bg-white rounded-xl shadow p-5 sm:p-6 mb-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
              Saved Addresses
            </h2>

            {user.addresses?.length > 0 ? (

              <div className="space-y-4">

                {user.addresses.map((address, index) => (

                  <div
                    key={index}
                    className="
                      border
                      rounded-lg
                      p-4
                      sm:p-5
                      bg-white
                      overflow-hidden
                    "
                  >

                    <p className="break-words">
                      <strong>Name:</strong>{" "}
                      {address.name || "N/A"}
                    </p>

                    <p className="break-words">
                      <strong>Phone:</strong>{" "}
                      {address.phone || "N/A"}
                    </p>

                    <p className="break-words">
                      <strong>Address:</strong>{" "}
                      {address.address || "N/A"}
                    </p>

                    <p className="break-words">
                      <strong>City:</strong>{" "}
                      {address.city || "N/A"}
                    </p>

                    <p className="break-words">
                      <strong>State:</strong>{" "}
                      {address.state || "N/A"}
                    </p>

                    <p className="break-words">
                      <strong>Pincode:</strong>{" "}
                      {address.pincode || "N/A"}
                    </p>

                    <p className="break-words">
                      <strong>Country:</strong>{" "}
                      {address.country || "N/A"}
                    </p>

                  </div>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No addresses found.
              </p>

            )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminUserDetails;