"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markNotificationAsRead = exports.getNotification = void 0;
const formattedData_1 = require("../helper/formattedData");
const response_1 = require("../helper/response");
const Notification_1 = __importDefault(require("../models/Notification"));
const getNotification = async (req, res) => {
    const user = req.user;
    try {
        const notifications = await Notification_1.default.find({
            userId: user.userId,
            isDeleted: { $ne: true },
        }).populate("senderId", "username");
        if (!notifications) {
            (0, response_1.sendResponse)(res, 500, "Server Error");
        }
        (0, response_1.sendResponse)(res, 200, "get all notifications successfully", (0, formattedData_1.formatDataNotification)(notifications).reverse());
    }
    catch (error) {
        return (0, response_1.handleServerError)(res, error);
    }
};
exports.getNotification = getNotification;
const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        await Notification_1.default.findByIdAndUpdate(notificationId, { isRead: true });
        (0, response_1.sendResponse)(res, 200, "update notification successfully");
    }
    catch (error) {
        return (0, response_1.handleServerError)(res, error);
    }
};
exports.markNotificationAsRead = markNotificationAsRead;
const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        await Notification_1.default.findByIdAndUpdate(notificationId, { isDeleted: true });
        (0, response_1.sendResponse)(res, 200, "Delete notification successfully");
    }
    catch (error) {
        return (0, response_1.handleServerError)(res, error);
    }
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationController.js.map