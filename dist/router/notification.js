"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const updateDataRequest_1 = require("../middleware/updateDataRequest");
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
router.get("/get-all", auth_1.verifyToken, updateDataRequest_1.updateDataRequest, notificationController_1.getNotification);
router.get("/delete/:id", auth_1.verifyToken, notificationController_1.deleteNotification);
router.get("/mark-as-read/:id", auth_1.verifyToken, notificationController_1.markNotificationAsRead);
exports.default = router;
//# sourceMappingURL=notification.js.map