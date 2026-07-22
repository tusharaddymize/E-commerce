import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Search,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getNotifications,
  deleteNotification,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notificationService";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();

      setNotifications(res.notifications || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    let data = [...notifications];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.message.toLowerCase().includes(keyword)
      );
    }

    switch (filter) {
      case "unread":
        data = data.filter((item) => !item.isRead);
        break;

      case "read":
        data = data.filter((item) => item.isRead);
        break;

      case "low_stock":
        data = data.filter(
          (item) => item.type === "low_stock"
        );
        break;

      case "order":
        data = data.filter(
          (item) => item.type === "order"
        );
        break;

      case "user":
        data = data.filter(
          (item) => item.type === "user"
        );
        break;

      case "contact":
        data = data.filter(
          (item) => item.type === "contact"
        );
        break;

      default:
        break;
    }

    return data;
  }, [notifications, search, filter]);

  const totalPages = Math.ceil(
    filteredNotifications.length / ITEMS_PER_PAGE
  );

  const paginatedNotifications =
    filteredNotifications.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      toast.success("Notification marked as read.");

      fetchNotifications();
    } catch (error) {
      console.log(error);

      toast.error("Unable to mark notification.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      toast.success("Notification deleted.");

      fetchNotifications();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed.");
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();

      toast.success("All notifications marked as read.");

      fetchNotifications();
    } catch (error) {
      console.log(error);

      toast.error("Operation failed.");
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "low_stock":
        return "bg-red-100 text-red-700";

      case "order":
        return "bg-blue-100 text-blue-700";

      case "user":
        return "bg-green-100 text-green-700";

      case "contact":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 md:p-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all admin notifications
          </p>

        </div>

        <button
          onClick={handleReadAll}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition"
        >
          <CheckCircle size={18} />

          Mark All Read

        </button>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-600"
        />

      </div>
            {/* Filter Buttons */}

      <div className="flex flex-wrap gap-3 mb-6">

        {[
          { label: "All", value: "all" },
          { label: "Unread", value: "unread" },
          { label: "Read", value: "read" },
          { label: "Orders", value: "order" },
          { label: "Low Stock", value: "low_stock" },
          { label: "Users", value: "user" },
          { label: "Contact", value: "contact" },
        ].map((item) => (

          <button
            key={item.value}
            onClick={() => {
              setFilter(item.value);
              setCurrentPage(1);
            }}
            className={`
              px-4
              py-2
              rounded-full
              transition
              text-sm
              font-medium

              ${
                filter === item.value
                  ? "bg-green-600 text-white"
                  : "bg-white border hover:bg-gray-100"
              }
            `}
          >
            {item.label}
          </button>

        ))}

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-xl border p-5">

          <h3 className="text-gray-500 text-sm">
            Total Notifications
          </h3>

          <p className="text-3xl font-bold mt-2">
            {notifications.length}
          </p>

        </div>

        <div className="bg-white rounded-xl border p-5">

          <h3 className="text-gray-500 text-sm">
            Unread
          </h3>

          <p className="text-3xl font-bold text-red-600 mt-2">
            {unreadCount}
          </p>

        </div>

        <div className="bg-white rounded-xl border p-5">

          <h3 className="text-gray-500 text-sm">
            Read
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {notifications.length - unreadCount}
          </p>

        </div>

        <div className="bg-white rounded-xl border p-5">

          <h3 className="text-gray-500 text-sm">
            Showing
          </h3>

          <p className="text-3xl font-bold mt-2">
            {filteredNotifications.length}
          </p>

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex flex-col items-center py-24">

          <div
            className="
              w-12
              h-12
              border-4
              border-green-600
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          <p className="mt-5 text-gray-500">
            Loading Notifications...
          </p>

        </div>

      ) : filteredNotifications.length === 0 ? (

        <div
          className="
            bg-white
            rounded-2xl
            border
            py-24
            text-center
          "
        >

          <Bell
            size={70}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-6 text-2xl font-bold">
            No Notifications
          </h2>

          <p className="mt-2 text-gray-500">
            You're all caught up 🎉
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {paginatedNotifications.map((item) => (

            <div
              key={item._id}
              className={`
                bg-white
                border
                rounded-2xl
                p-5
                shadow-sm
                transition
                hover:shadow-md

                ${
                  !item.isRead
                    ? "border-green-500"
                    : "border-gray-200"
                }
              `}
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-5">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <h2 className="font-bold text-lg">
                      {item.title}
                    </h2>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${getTypeColor(item.type)}
                      `}
                    >
                      {item.type.replace("_", " ")}
                    </span>

                  </div>

                  <p className="text-gray-600 mt-3">
                    {item.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-3">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                    {" • "}

                    {new Date(
                      item.createdAt
                    ).toLocaleTimeString()}

                  </p>

                  {!item.isRead && (

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        mt-3
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-xs
                        font-semibold
                      "
                    >
                      New
                    </div>

                  )}

                </div>

                <div className="flex items-start gap-2">
                                      {!item.isRead && (
                    <button
                      onClick={() => handleRead(item._id)}
                      className="
                        p-2
                        rounded-lg
                        bg-green-100
                        hover:bg-green-200
                        transition
                      "
                      title="Mark as Read"
                    >
                      <CheckCircle
                        size={18}
                        className="text-green-700"
                      />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="
                      p-2
                      rounded-lg
                      bg-red-100
                      hover:bg-red-200
                      transition
                    "
                    title="Delete Notification"
                  >
                    <Trash2
                      size={18}
                      className="text-red-700"
                    />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Pagination */}

      {!loading && totalPages > 1 && (

        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="
              px-4
              py-2
              rounded-lg
              border
              bg-white
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`
                  w-10
                  h-10
                  rounded-lg
                  font-semibold
                  transition

                  ${
                    currentPage === index + 1
                      ? "bg-green-600 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }
                `}
              >
                {index + 1}
              </button>

            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="
              px-4
              py-2
              rounded-lg
              border
              bg-white
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
};

export default AdminNotifications;