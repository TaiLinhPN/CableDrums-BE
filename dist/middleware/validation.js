"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderValidation = exports.createOrderValidation = exports.createContractValidation = exports.userLoginValidation = exports.userCreateValidation = void 0;
const User_1 = __importDefault(require("../models/User"));
const response_1 = require("../helper/response");
const userValidationSchema_1 = require("../validation/userValidationSchema");
const Contract_1 = __importDefault(require("../models/Contract"));
const cableAvalable_1 = require("../helper/cableAvalable");
const checkUser_1 = require("../helper/checkUser");
const Oder_1 = __importDefault(require("../models/Oder"));
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
        return res.status(401).json({
            errors: validation.error.details[0].path[0] + " is not a valid",
        });
    }
    next();
};
exports.userLoginValidation = userLoginValidation;
const createContractValidation = async (req, res, next) => {
    if (req.user.userType !== "admin") {
        return (0, response_1.sendResponse)(res, 400, "You do not have permission to create a contract");
    }
    const isSupplyVendor = await (0, checkUser_1.checkUser)(req.body.supplyVendorId, "supplyVendor");
    if (!isSupplyVendor) {
        return (0, response_1.sendResponse)(res, 400, "Supply Vendor not found");
    }
    next();
};
exports.createContractValidation = createContractValidation;
const createOrderValidation = async (req, res, next) => {
    const { contractId, projectContractorId, cableDrumsToWithdraw } = req.body;
    if (req.user.userType !== "planner") {
        return (0, response_1.sendResponse)(res, 400, "You do not have permission to create a order.");
    }
    try {
        const contract = await Contract_1.default.findById(contractId);
        if (!contract) {
            return (0, response_1.sendResponse)(res, 400, "Contract not found.");
        }
        const cableDrumsAvailable = (0, cableAvalable_1.cablesAvailable)(contract);
        if (cableDrumsToWithdraw > cableDrumsAvailable) {
            return (0, response_1.sendResponse)(res, 400, "The required number of cable drums exceeds the available cable drums");
        }
        const isProjectContractor = await (0, checkUser_1.checkUser)(projectContractorId, "projectContractor");
        if (!isProjectContractor) {
            return (0, response_1.sendResponse)(res, 400, "Project Contractor not found");
        }
        req.body.contract = contract;
        next();
    }
    catch (error) {
        console.log(error);
        return;
    }
};
exports.createOrderValidation = createOrderValidation;
const updateOrderValidation = async (req, res, next) => {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const userType = req.user.userType;
    const userId = req.user.userId;
    try {
        const order = await Oder_1.default.findById(orderId);
        if (!order) {
            return (0, response_1.sendResponse)(res, 404, "Order not found");
        }
        if (order.status === "completed") {
            return (0, response_1.sendResponse)(res, 400, "Order has already been completed");
        }
        if ((userType === "supplyVendor" &&
            order.supplyVendorId.toString() === userId) ||
            (userType === "projectContractor" &&
                order.projectContractorId.toString() === userId)) {
            if ((order.status === "newRequest" && status === "readyForPickup") ||
                (order.status === "readyForPickup" && status === "completed")
            // ( order.status === "newRequest" && status === "inPreparation"  ) ||
            // (order.status === "inPreparation" && status === "readyForPickup") ||
            // (order.status === "readyForPickup" && status === "delivered") ||
            // (order.status === "delivered" && status === "inTransit") ||
            // (order.status === "inTransit" && status === "completed")
            ) {
                return next();
            }
            else {
                return (0, response_1.sendResponse)(res, 400, "Invalid order status transition");
            }
        }
        else {
            return (0, response_1.sendResponse)(res, 400, "You do not have permission to update the order");
        }
    }
    catch (error) {
        (0, response_1.handleServerError)(res, error);
    }
};
exports.updateOrderValidation = updateOrderValidation;
//# sourceMappingURL=validation.js.map