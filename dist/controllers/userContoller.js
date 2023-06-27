"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.removeUser = exports.getUsers = exports.findUser = void 0;
const response_1 = require("../helper/response");
const User_1 = __importDefault(require("../models/User"));
const sendMail_1 = require("../helper/sendMail");
const argon2_1 = __importDefault(require("argon2"));
const notification_1 = require("../helper/notification");
const findUser = async (req, res) => {
    const { query } = req.body;
    const searchString = String(query);
    try {
        const users = await User_1.default.find({
            $or: [
                { email: { $regex: searchString, $options: "i" } },
                { username: { $regex: searchString, $options: "i" } },
            ],
        }, "_id username email avatar");
        (0, response_1.sendResponse)(res, 201, "get user successful", users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.findUser = findUser;
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("_id username email userType");
        if (!users) {
            (0, response_1.sendResponse)(res, 500, "Server Error");
        }
        (0, response_1.sendResponse)(res, 201, "get all users successfully", users);
    }
    catch (error) {
        (0, response_1.handleServerError)(res, error);
    }
};
exports.getUsers = getUsers;
const removeUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User_1.default.findById(userId);
        if (user && user.userType !== "admin") {
            const isDeleteUser = await User_1.default.findByIdAndDelete(userId);
            if (isDeleteUser) {
                global._io.emit("remove-account", userId);
                return (0, response_1.sendResponse)(res, 204, "User has been deleted");
            }
        }
        return (0, response_1.sendResponse)(res, 404, "User not found or you do not have permission to delete an Admin account");
    }
    catch (error) {
        return (0, response_1.handleServerError)(res, error);
    }
};
exports.removeUser = removeUser;
const createUser = async (req, res) => {
    const senderId = req.user.userId;
    const { username, email, userType } = req.body;
    try {
        const password = await argon2_1.default.hash("qwert@123");
        const newUser = new User_1.default({
            username,
            email,
            userType,
            password,
        });
        newUser.save();
        const publicUser = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            userType: newUser.userType,
        };
        global._io.emit("new-account", publicUser);
        (0, notification_1.sendNotification)(senderId, publicUser._id, `Your account has been created`);
        (0, sendMail_1.mailRegister)("Your account has been created", email);
        (0, response_1.sendResponse)(res, 200, "user successfully created");
    }
    catch (err) {
        return (0, response_1.handleServerError)(res, err);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userContoller.js.map