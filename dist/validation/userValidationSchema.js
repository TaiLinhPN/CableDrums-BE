"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    username: joi_1.default.string()
        .trim()
        .pattern(/^\S.*\S$/)
        .replace(/[\s]+/g, " ")
        .strict()
        .min(3)
        .regex(/^.*\S*.*$/)
        .max(30)
        .required(),
    email: joi_1.default.string()
        .email()
        .regex(/\.energysure-tech@/)
        .required(),
    userType: joi_1.default.string()
        .valid("admin", "planner", "supplyVendor", "projectContractor")
        .required(),
});
exports.loginSchema = joi_1.default.object({
    password: joi_1.default.string()
        .pattern(/^(?=.*[a-zA-Z])/)
        .pattern(/^(?=.*\d)/)
        .pattern(/^(?=.*[!@#$%^&*])/)
        .trim()
        .strict()
        .min(6)
        .required(),
    email: joi_1.default.string().email().required(),
});
//# sourceMappingURL=userValidationSchema.js.map