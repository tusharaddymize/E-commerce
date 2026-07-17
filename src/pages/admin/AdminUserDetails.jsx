import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import {
  getUserById,
  updateUserRole,
  toggleUserBlock,
  deleteUser,
} from "../../services/userService";

const AdminUserDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===============================
  // Load User
  // ===============================

  const loadUser = async () => {
    try {
      setLoading(true);

      const data = await getUserById(id);

      setUser(data.user);

      setStats(data.stats);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  // ===============================
  // Update Role
  // ===============================

  const handleRoleChange = async (role) => {
    try {
      await updateUserRole(id, role);

      toast.success("Role updated");

      loadUser();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update role");
    }
  };

  // ===============================
  // Block / Unblock
  // ===============================

  const handleBlock = async () => {
    try {
      await toggleUserBlock(id);

      toast.success(
        user.isBlocked
          ? "User unblocked"
          : "User blocked"
      );

      loadUser();
    } catch (error) {
      console.error(error);

      toast.error("Operation failed");
    }
  };

  // ===============================
  // Delete User
  // ===============================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this user permanently?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      toast.success("User deleted");

      navigate("/admin/users");
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        User not found.
      </div>
    );
  }


    return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1">
        {/* Navbar */}
        <AdminNavbar />

        <div className="p-6">

          {/* Back Button */}
          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-2 mb-6 text-green-700 hover:text-green-900"
          >
            <ArrowLeft size={20} />
            Back to Users
          </button>

          {/* User Profile */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">

              <img
                src={
                  user.avatar ||
                  "https://via.placeholder.com/150"
                }
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border"
              />

              <div className="flex-1">

                <h2 className="text-3xl font-bold mb-2">
                  {user.name}
                </h2>

                <p className="text-gray-600 mb-1">
                  {user.email}
                </p>

                <p className="text-gray-600 mb-1">
                  {user.phone || "No Phone"}
                </p>

                <p className="text-gray-600 mb-1">
                  Role :
                  <span className="font-semibold ml-2">
                    {user.role}
                  </span>
                </p>

                <p className="text-gray-600">
                  Member Since :
                  <span className="ml-2">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </span>
                </p>

              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Total Orders
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats?.totalOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Total Spending
              </h3>

              <p className="text-3xl font-bold mt-2">
                ₹{stats?.totalSpent || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Saved Addresses
              </h3>

              <p className="text-3xl font-bold mt-2">
                {user.addresses?.length || 0}
              </p>
            </div>

          </div>

          {/* Address List */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold mb-4">
              Saved Addresses
            </h2>

            {user.addresses?.length > 0 ? (
              <div className="space-y-4">

                {user.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4"
                  >

                    <p>
                      <strong>Name:</strong>{" "}
                      {address.name}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {address.phone}
                    </p>

                    <p>
                      <strong>Address:</strong>{" "}
                      {address.address}
                    </p>

                    <p>
                      <strong>City:</strong>{" "}
                      {address.city}
                    </p>

                    <p>
                      <strong>State:</strong>{" "}
                      {address.state}
                    </p>

                    <p>
                      <strong>Pincode:</strong>{" "}
                      {address.pincode}
                    </p>

                    <p>
                      <strong>Country:</strong>{" "}
                      {address.country}
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

          {/* Admin Controls */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              Admin Controls
            </h2>

            <div className="flex flex-wrap gap-4">

              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(
                    e.target.value
                  )
                }
                className="border rounded-lg px-4 py-2"
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

              <button
                onClick={handleBlock}
                className={`px-5 py-2 rounded-lg text-white ${
                  user.isBlocked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {user.isBlocked
                  ? "Unblock User"
                  : "Block User"}
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete User
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;