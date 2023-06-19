"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContract = exports.getAllContracts = exports.createContract = void 0;
const response_1 = require("../helper/response");
const Contract_1 = __importDefault(require("../models/Contract"));
const formattedData_1 = require("../helper/formattedData");
const createContract = async (req, res) => {
    try {
        const { contractName, supplyVendor, cableDrumCount, cableDelivered, expireAt } = req.body;
        const newContract = await new Contract_1.default({
            contractName,
            supplyVendor,
            cableDrumCount,
            cableDelivered,
            expireAt,
        }).save();
        if (!newContract) {
            return (0, response_1.sendResponse)(res, 400, "Internal Server Error");
        }
        const contractsData = await Contract_1.default.findById(newContract._id).populate("supplyVendor", "username");
        const modifiedData = (0, formattedData_1.formatContractData)([contractsData]);
        global._io.emit("new-contract", modifiedData[0]);
        // mailRegister("Your account has been created", email);
        (0, response_1.sendResponse)(res, 200, "Contract successfully created");
    }
    catch (err) {
        return (0, response_1.handleServerError)(res, err);
    }
};
exports.createContract = createContract;
const getAllContracts = async (req, res) => {
    let conditions = {};
    const user = req.user;
    console.log(user.userType);
    if (user.userType === "supplyVendor") {
        console.log(user.userType);
        conditions = { supplyVendor: user.userId };
    }
    else if (user.userType === "projectContractor") {
        (0, response_1.sendResponse)(res, 404, "you do not have permission to request");
    }
    try {
        const contracts = await Contract_1.default.find(conditions).populate("supplyVendor", "username");
        const modifiedData = (0, formattedData_1.formatContractData)(contracts);
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