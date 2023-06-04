"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRegister = exports.sendMailUpdateOrder = exports.sendMailNewOrder = void 0;
const mailConfig_1 = require("../config/mailConfig");
const User_1 = __importDefault(require("../models/User"));
const sendMailNewOrder = async (userId, cableRequired, orderId) => {
    const email = await findEmail(userId);
    if (email) {
        const content = `The request to unplug the cable has been made, and the required amount of cable drums ${cableRequired}. Please prepare the required number of cable drums. See details at: Link`;
        (0, mailConfig_1.sendMail)(email, `EnergySure-tech`, content);
    }
};
exports.sendMailNewOrder = sendMailNewOrder;
const sendMailUpdateOrder = async (userId, status, orderId) => {
    const email = await findEmail(userId);
    if (email) {
        const content = `The request to update the cable has been made, and the stats have been updated to ${status}`;
        (0, mailConfig_1.sendMail)(email, `EnergySure-tech`, content);
    }
};
exports.sendMailUpdateOrder = sendMailUpdateOrder;
const findEmail = async (userId) => {
    try {
        const user = await User_1.default.findById(userId).select("email");
        return user.email;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
const mailRegister = (connect, email) => {
    const message = connect;
    (0, mailConfig_1.sendMail)(email, `EnergySure-tech`, message);
};
exports.mailRegister = mailRegister;
//# sourceMappingURL=sendMail.js.map