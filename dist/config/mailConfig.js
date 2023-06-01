"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL,
    },
};
const transporter = nodemailer_1.default.createTransport(mailConfig);
async function sendMail(to, subject, text) {
    const mailOptions = {
        from: mailConfig.auth.user,
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions);
}
exports.sendMail = sendMail;
exports.default = sendMail;
//# sourceMappingURL=mailConfig.js.map