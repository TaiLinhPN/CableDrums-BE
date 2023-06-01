"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRegister = void 0;
const mailConfig_1 = require("../config/mailConfig");
const mailRegister = (connect, email) => {
    const message = connect;
    (0, mailConfig_1.sendMail)(email, `EnergySure-tech`, message);
};
exports.mailRegister = mailRegister;
//# sourceMappingURL=mailUtils.js.map