"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const checkUser = async (userId, userType) => {
    try {
        const user = await User_1.default.findById(userId).select("userType");
        if (user && user.userType === userType) {
            return true;
        }
        else
            return false;
    }
    catch (error) {
        console.log("checkUser", error);
        return false;
    }
};
exports.checkUser = checkUser;
//# sourceMappingURL=checkUser.js.map