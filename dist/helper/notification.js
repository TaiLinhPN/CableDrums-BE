"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.createNotification = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
const formattedData_1 = require("./formattedData");
const createNotification = async (senderId, userId, content, link) => {
    try {
        return await new Notification_1.default({
            senderId,
            userId,
            content,
            link,
        }).save();
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.createNotification = createNotification;
const sendNotification = async (senderId, userId, content, link) => {
    const notification = await (0, exports.createNotification)(senderId, userId, content, link);
    if (notification) {
        let data = await Notification_1.default.findById(notification._id).populate("senderId", "username");
        data = (0, formattedData_1.formatDataNotification)([data]);
        global._io.to(userId).emit("notification", { data: data[0] });
    }
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=notification.js.map