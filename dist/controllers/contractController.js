"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContract = exports.getAllContracts = exports.createContract = void 0;
const formattedDate_1 = require("../helper/formattedDate");
const response_1 = require("../helper/response");
const Contract_1 = __importDefault(require("../models/Contract"));
const createContract = async (req, res) => {
    try {
        const { supplyVendor, cableDrumCount, cableDelivered, expireAt } = req.body;
        const newContract = await new Contract_1.default({
            supplyVendor,
            cableDrumCount,
            cableDelivered,
            expireAt,
        }).save();
        if (!newContract) {
            return (0, response_1.sendResponse)(res, 400, "Internal Server Error");
        }
        global._io.emit("new-Contract", newContract);
        // mailRegister("Your account has been created", email);
        (0, response_1.sendResponse)(res, 200, "Contract successfully created");
    }
    catch (err) {
        return (0, response_1.handleServerError)(res, err);
    }
};
exports.createContract = createContract;
const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract_1.default.find().populate("supplyVendor", "username");
        const modifiedData = contracts.map(({ _id, supplyVendor, cableDrumCount, cableDelivered, cableRequired, expireAt, createAt, }) => ({
            _id,
            supplyVendor: supplyVendor,
            cableDrumCount,
            cableDelivered,
            cableRequired,
            expireAt: (0, formattedDate_1.extractDate)(expireAt),
            createAt: (0, formattedDate_1.extractDate)(createAt),
        }));
        (0, response_1.sendResponse)(res, 201, "Get data successful", modifiedData);
    }
    catch (err) {
        return (0, response_1.handleServerError)(res, err);
    }
};
exports.getAllContracts = getAllContracts;
const updateContract = async (req, res) => {
    const { contractId, cableRequired } = req.body;
    try {
        const updateContract = await Contract_1.default.findByIdAndUpdate(contractId, {
            cableRequired,
        });
        if (!updateContract) {
            return (0, response_1.sendResponse)(res, 400, "Cant update contract, try again");
        }
        (0, response_1.sendResponse)(res, 201, "contract update successful");
    }
    catch (error) {
        (0, response_1.handleServerError)(res, error);
    }
};
exports.updateContract = updateContract;
//# sourceMappingURL=contractController.js.map