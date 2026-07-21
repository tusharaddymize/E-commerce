import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

import { getAllUsers } from "../../services/userService";

const UserManagement = () => {
  // ===============================
  // States
  // ===============================

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  // Responsive Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const limit = 10;

  // ===============================
  // Load Users
  // ===============================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers({
        page,
        limit,
        search,
      });

      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  // ===============================
  // Search
  // ===============================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ===============================
  // Loading Screen
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex">

          <AdminSidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />

          <div className="flex-1 min-w-0 flex flex-col">

            <AdminNavbar
              setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-1 items-center justify-center p-6">

              <div className="rounded-2xl border border-gray-200 bg-white px-10 py-10 shadow-sm">

                <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <h2 className="text-center text-xl font-bold text-gray-800">
                  Loading Users...
                </h2>

                <p className="mt-2 text-center text-gray-500">
                  Please wait while user information is loading.
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="flex">

        {/* Sidebar */}

        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Main Content */}

        <div className="flex-1 min-w-0 flex flex-col">

          {/* Navbar */}

          <AdminNavbar
            setSidebarOpen={setSidebarOpen}
          />

          {/* Page */}

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {/* ===============================
                Header
            =============================== */}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  User Management
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Manage registered users, monitor account status and view user
                  information.
                </p>

              </div>

              {/* Summary Card */}

              <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 shadow-sm">

                <p className="text-sm text-gray-500">
                  Users On This Page
                </p>

                <h2 className="mt-1 text-3xl font-bold text-green-700">
                  {users.length}
                </h2>

              </div>

            </div>

            {/* ===============================
                Search Section
            =============================== */}

            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex flex-col gap-4 md:flex-row md:items-center">

                {/* Search */}

                <div className="relative flex-1">

                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={handleSearch}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      py-3
                      pl-12
                      pr-4
                      outline-none
                      transition-all
                      duration-200
                      focus:border-green-600
                      focus:ring-4
                      focus:ring-green-100
                    "
                  />

                </div>

              </div>

            </div>

            {/* ===============================
                Loading
            =============================== */}

            {loading ? (

              <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center shadow-sm">

                <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <p className="text-gray-500">
                  Loading Users...
                </p>

              </div>

            ) : (
                            <>
                {/* ===============================
                    Desktop Table
                =============================== */}

                <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="min-w-full">

                      <thead className="bg-green-700 text-white">

                        <tr>

                          <th className="px-5 py-4 text-left font-semibold">
                            Avatar
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Name
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Email
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Role
                          </th>

                          <th className="px-5 py-4 text-left font-semibold">
                            Status
                          </th>

                          <th className="px-5 py-4 text-center font-semibold">
                            Action
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {users.length === 0 ? (

                          <tr>

                            <td
                              colSpan={6}
                              className="py-16 text-center text-gray-500"
                            >
                              No Users Found
                            </td>

                          </tr>

                        ) : (

                          users.map((user) => (

                            <tr
                              key={user._id}
                              className="border-b transition hover:bg-green-50"
                            >

                              <td className="px-5 py-4">

                                <img
                                  src={
                                    user.avatar ||
                                    "https://via.placeholder.com/50"
                                  }
                                  alt={user.name}
                                  className="h-12 w-12 rounded-full border object-cover"
                                />

                              </td>

                              <td className="px-5 py-4">

                                <h3 className="font-semibold text-gray-800">
                                  {user.name}
                                </h3>

                              </td>

                              <td className="px-5 py-4 text-gray-600">
                                {user.email}
                              </td>

                              <td className="px-5 py-4">

                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-700">
                                  {user.role}
                                </span>

                              </td>

                              <td className="px-5 py-4">

                                <span
                                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                                    user.isBlocked
                                      ? "bg-red-100 text-red-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {user.isBlocked
                                    ? "Blocked"
                                    : "Active"}
                                </span>

                              </td>

                              <td className="px-5 py-4">

                                <div className="flex justify-center">

                                  <Link
                                    to={`/admin/users/${user._id}`}
                                    className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                  >
                                    <Eye size={18} />
                                  </Link>

                                </div>

                              </td>

                            </tr>

                          ))

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

                {/* ===============================
                    Mobile Cards
                =============================== */}

                <div className="space-y-5 lg:hidden">

                  {users.length === 0 ? (

                    <div className="rounded-2xl bg-white py-16 text-center shadow">
                      No Users Found
                    </div>

                  ) : (

                    users.map((user) => (

                      <div
                        key={user._id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >

                        <div className="flex items-center gap-4">

                          <img
                            src={
                              user.avatar ||
                              "https://via.placeholder.com/60"
                            }
                            alt={user.name}
                            className="h-16 w-16 rounded-full border object-cover"
                          />

                          <div className="flex-1">

                            <h3 className="font-semibold text-gray-800">
                              {user.name}
                            </h3>

                            <p className="mt-1 break-all text-sm text-gray-500">
                              {user.email}
                            </p>

                          </div>

                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4">

                          <div>

                            <p className="text-sm text-gray-500">
                              Role
                            </p>

                            <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-700">
                              {user.role}
                            </span>

                          </div>

                          <div>

                            <p className="text-sm text-gray-500">
                              Status
                            </p>

                            <span
                              className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                user.isBlocked
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {user.isBlocked
                                ? "Blocked"
                                : "Active"}
                            </span>

                          </div>

                        </div>

                        <Link
                          to={`/admin/users/${user._id}`}
                          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                          <Eye size={18} />
                          View Profile
                        </Link>

                      </div>

                    ))

                  )}

                </div>
                                {/* ===============================
                    Pagination
                =============================== */}

                <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row">

                  <p className="text-sm text-gray-500">
                    Page{" "}
                    <span className="font-semibold">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {totalPages}
                    </span>
                  </p>

                  <div className="flex gap-3">

                    <button
                      disabled={page === 1}
                      onClick={() =>
                        setPage((prev) => prev - 1)
                      }
                      className="
                        rounded-xl
                        border
                        border-gray-300
                        bg-white
                        px-5
                        py-2.5
                        font-medium
                        transition
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Previous
                    </button>

                    <button
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((prev) => prev + 1)
                      }
                      className="
                        rounded-xl
                        bg-green-600
                        px-5
                        py-2.5
                        font-medium
                        text-white
                        transition
                        hover:bg-green-700
                        disabled:cursor-not-allowed
                        disabled:bg-gray-400
                      "
                    >
                      Next
                    </button>

                  </div>

                </div>

              </>

            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default UserManagement;