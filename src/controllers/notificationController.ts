import { formatDataNotification } from "../helper/formattedData";
import { handleServerError, sendResponse } from "../helper/response";
import Notification from "../models/Notification";

export const getNotification = async (req, res) => {
  const user = req.user;

  try {
    const notifications = await Notification.find({
      userId: user.userId,
      isDeleted: { $ne: true },
    }).populate("senderId", "username");
    if (!notifications) {
      sendResponse(res, 500, "Server Error");
    }
    sendResponse(
      res,
      200,
      "get all notifications successfully",
      formatDataNotification(notifications).reverse()
    );
  } catch (error) {
   return handleServerError(res, error);
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    sendResponse(res, 200, "update notification successfully");
  } catch (error) {
    return handleServerError(res, error);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    await Notification.findByIdAndUpdate(notificationId, { isDeleted: true });
    sendResponse(res, 200, "Delete notification successfully");
  } catch (error) {
    return handleServerError(res, error);
  }
};
