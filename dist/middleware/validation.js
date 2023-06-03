"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContractValidation = exports.userLoginValidation = exports.userCreateValidation = void 0;
const User_1 = __importDefault(require("../models/User"));
const response_1 = require("../helper/response");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const userCreateValidation = async (req, res, next) => {
    const validation = userValidationSchema_1.registerSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details[0].path[0] + " is not a valid",
        });
    }
    let { email } = req.body;
    try {
        email = await User_1.default.findOne({ email });
        if (email) {
            return (0, response_1.sendResponse)(res, 400, "email already exists");
        }
        next();
    }
    catch (error) {
        return (0, response_1.handleServerError)(res, error);
    }
};
exports.userCreateValidation = userCreateValidation;
const userLoginValidation = (req, res, next) => {
    const validation = userValidationSchema_1.loginSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details[0].path[0] + " is not a valid",
        });
    }
    next();
};
exports.userLoginValidation = userLoginValidation;
const createContractValidation = (req, res, next) => {
};
exports.createContractValidation = createContractValidation;
//# sourceMappingURL=validation.js.map