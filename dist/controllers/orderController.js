"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.updateOrder = exports.createOrder = void 0;
const response_1 = require("../helper/response");
const Contract_1 = __importDefault(require("../models/Contract"));
const Oder_1 = __importDefault(require("../models/Oder"));
const sendMail_1 = require("../helper/sendMail");
const formattedData_1 = require("../helper/formattedData");
const createOrder = async (req, res) => {
    const { contract, projectContractorId, cableDrumsToWithdraw, note } = req.body;
    try {
        const newNote = {
            username: `${req.user.username} was created a new order`,
            time: new Date(),
            message: note,
        };
        const orders = await Oder_1.default.find();
        const newOrder = await new Oder_1.default({
            orderName: `request-${(orders.length + 1).toString().padStart(2, "0")}`,
            plannerId: req.user.userId,
            contractId: contract._id,
            supplyVendorId: contract.supplyVendor,
            projectContractorId,
            cableDrumsToWithdraw,
            notes: newNote,
        }).save();
        if (!newOrder) {
            return (0, response_1.sendResponse)(res, 500, "Internal server error");
        }
        // code update contract
        const updatedContract = await Contract_1.default.findByIdAndUpdate(contract._id, { $inc: { cableRequired: cableDrumsToWithdraw } }, { new: true });
        if (!updatedContract) {
            return (0, response_1.sendResponse)(res, 400, "Can't update contract, try again");
        }
        global._io.emit("update-contract-new-order", updatedContract);
        // format data to sent to client
        const order = await Oder_1.default.findById(newOrder._id)
            .populate("contractId", "contractName")
            .populate("supplyVendorId", "username")
            .populate("plannerId", "username")
            .populate("projectContractorId", "username")
            .select("-__v");
        const result = (0, formattedData_1.formatDataOrder)([order]);
        global._io.emit("new-order", result[0]);
        (0, response_1.sendResponse)(res, 201, "Create new order successful", newOrder);
        (0, sendMail_1.sendMailNewOrder)(newOrder.supplyVendorId.toString(), newOrder.cableDrumsToWithdraw);
        (0, sendMail_1.sendMailNewOrder)(newOrder.projectContractorId.toString(), newOrder.cableDrumsToWithdraw);
    }
    catch (error) {
        (0, response_1.handleServerError)(res, error);
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const { status, note } = req.body;
    try {
        const order = await Oder_1.default.findById(orderId);
        if (!order) {
            return (0, response_1.sendResponse)(res, 404, "Order not found");
        }
        order.status = status;
        const newNote = {
            username: `${req.user.username} was updated status to ${status}`,
            time: new Date(),
            message: note,
        };
        order.notes.push(newNote);
        await order.save();
        if (status === "completed") {
            await updateContractOnOrderCompletion(order);
        }
        // format data to sent to client
        const orderData = await Oder_1.default.findById(orderId)
            .populate("supplyVendorId", "username")
            .populate("plannerId", "username")
            .populate("projectContractorId", "username")
            .populate("contractId", "contractName")
            .select("-__v");
        const result = (0, formattedData_1.formatDataOrder)([orderData]);
        global._io.emit("update-order", result[0]);
        (0, response_1.sendResponse)(res, 200, "Order updated successfully");
        (0, sendMail_1.sendMailUpdateOrder)(order.supplyVendorId.toString(), order.status);
        (0, sendMail_1.sendMailUpdateOrder)(order.projectContractorId.toString(), order.status);
        (0, sendMail_1.sendMailUpdateOrder)(order.plannerId.toString(), order.status);
    }
    catch (error) {
        (0, response_1.handleServerError)(res, error);
    }
};
exports.updateOrder = updateOrder;
const getAllOrders = async (req, res) => {
    const user = req.user;
    let conditions = {};
    if (user.userType === "projectContractor") {
        conditions = { projectContractorId: user.userId };
    }
    else if (user.userType === "supplyVendor") {
        conditions = { supplyVendorId: user.userId };
    }
    try {
        const orders = await Oder_1.default.find(conditions)
            .populate("supplyVendorId", "username")
            .populate("plannerId", "username")
            .populate("projectContractorId", "username")
            .populate("contractId", "contractName")
            .select("-__v");
        if (!orders) {
            return (0, response_1.sendResponse)(res, 500, "Internal Server Error");
        }
        const result = (0, formattedData_1.formatDataOrder)(orders);
        (0, response_1.sendResponse)(res, 201, "Get order successful", result);
    }
    catch (error) {
        (0, response_1.handleServerError)(res, error);
    }
};
exports.getAllOrders = getAllOrders;
const updateContractOnOrderCompletion = async (order) => {
    const contract = await Contract_1.default.findById(order.contractId);
    if (!contract) {
        throw new Error("Contract not found");
    }
    const updatedContract = await updateContractWithDeliveredCable(contract, order.cableDrumsToWithdraw);
    global._io.emit("update-contract-complete-order", updatedContract);
};
const updateContractWithDeliveredCable = async (contract, cableDrumsToWithdraw) => {
    const updatedContract = await Contract_1.default.findByIdAndUpdate(contract._id, {
        cableRequired: contract.cableRequired - cableDrumsToWithdraw,
        cableDelivered: contract.cableDelivered + cableDrumsToWithdraw,
    }, { new: true });
    if (!updatedContract) {
        throw new Error("Unable to update contract");
    }
    return updatedContract;
};
//# sourceMappingURL=orderController.js.map