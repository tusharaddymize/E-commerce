import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaTrash,
  FaCheck,
} from "react-icons/fa";
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../../services/notificationService";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

useEffect(() => {
  fetchNotifications();

  const interval = setInterval(() => {
    fetchNotifications();
  }, 5000);

  return () => clearInterval(interval);
}, []);

const fetchNotifications = async () => {
  try {
    const data = await getNotifications();

    console.log("API Response:", data);
    console.log("Notifications:", data.notifications);

    setNotifications(data.notifications || []);
  } catch (error) {
    console.error(error);
  }
};

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const handleRead = async (id) => {
    await markNotificationRead(id);
    fetchNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotifications();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Bell */}
<button
  onClick={async () => {
    await fetchNotifications();
    setOpen(!open);
  }}
  className="relative p-2 rounded-full hover:bg-gray-100 transition"
>
        <FaBell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-[340px]
            max-h-[420px]
            overflow-y-auto
            bg-white
            rounded-xl
            shadow-xl
            border
            z-50
          "
        >
          <div className="p-4 border-b font-semibold text-lg">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No Notifications
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                className={`p-4 border-b hover:bg-gray-50 transition ${
                  !item.isRead
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.message}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!item.isRead && (
                      <button
                        onClick={() =>
                          handleRead(item._id)
                        }
                        className="text-green-600 hover:text-green-700"
                        title="Mark Read"
                      >
                        <FaCheck />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;