import Notification from "../models/Notification.js";

// ======================================
// Get All Notifications
// ======================================
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Mark Notification Read
// ======================================
export const markAsRead = async (req, res) => {
  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Mark All Read
// ======================================
export const markAllRead = async (req, res) => {

  try {

    await Notification.updateMany(
      { isRead: false },
      {
        $set: {
          isRead: true,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Delete Notification
// ======================================
export const deleteNotification = async (req, res) => {

  try {

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};