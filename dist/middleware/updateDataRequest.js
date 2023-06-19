"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDataRequest = void 0;
const User_1 = __importDefault(require("../models/User"));
const response_1 = require("../helper/response");
const updateDataRequest = async (req, res, next) => {
    const userId = req.user.userId;
    console.log("un?", userId);
    if (!userId) {
        return res.status(403).json({ success: false, message: "User not found" });
    }
    try {
        const user = await User_1.default.findById(userId).select("_id username email userType");
        if (!user) {
            return res
                .status(403)
                .json({ success: false, message: "User not found" });
        }
        req.user = {
            userId: userId,
            username: user.username,
            userType: user.userType,
            email: user.email,
        };
        next();
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 403, "Invalid access token");
    }
};
exports.updateDataRequest = updateDataRequest;
//# sourceMappingURL=updateDataRequest.js.map