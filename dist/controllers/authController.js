"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.login = void 0;
const argon2_1 = __importDefault(require("argon2"));
const User_1 = __importDefault(require("../models/User"));
const tokenUtils_1 = require("../utils/tokenUtils");
const response_1 = require("../helper/response");
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return (0, response_1.sendResponse)(res, 404, "Incorrect email or password?");
        }
        const isMatch = await argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            return (0, response_1.sendResponse)(res, 401, "Incorrect email or password?");
        }
        if (checkDefaultPassword(password)) {
            return (0, response_1.sendResponse)(res, 400, "password defaults, reset password");
        }
        const token = (0, tokenUtils_1.generateToken)(user._id);
        const publicUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            userType: user.userType,
        };
        (0, response_1.sendResponse)(res, 200, "Login successfully", {
            token,
            user: publicUser,
        });
    }
    catch (err) {
        return (0, response_1.handleServerError)(res, err);
    }
};
exports.login = login;
const resetPassword = async (req, res) => {
    const { password, email } = req.body;
    console.log(password, email);
    if (checkDefaultPassword(password)) {
        return (0, response_1.sendResponse)(res, 400, "password defaults, enter another password");
    }
    try {
        const passwordHashed = await argon2_1.default.hash(password);
        console.log("passwordHashed", passwordHashed);
        const newPassword = await User_1.default.findOneAndUpdate({ email: email }, { password: passwordHashed });
        console.log("what", newPassword);
        if (!newPassword) {
            return (0, response_1.sendResponse)(res, 404, "Update password unsuccessfully, try again");
        }
        (0, response_1.sendResponse)(res, 200, "Update password successfully");
    }
    catch (error) {
        return (0, response_1.handleServerError)(res, error);
    }
};
exports.resetPassword = resetPassword;
const checkDefaultPassword = (password) => {
    if (password === "qwert@123!") {
        return true;
    }
    else
        return false;
};
//# sourceMappingURL=authController.js.map