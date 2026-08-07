import Notification from "../models/Notification.js";

export const createNotification = async ({
  title,
  message,
  type,
  referenceId,
}) => {

  try {

    // Prevent duplicate unread notification
    const exists = await Notification.findOne({
      type,
      referenceId,
      isRead: false,
    });

    if (exists) {
      return exists;
    }

    return await Notification.create({
      title,
      message,
      type,
      referenceId,
    });

  } catch (error) {

    console.log(error.message);

    return null;
  }
};