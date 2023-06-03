"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContracts = exports.createContract = void 0;
const formattedDate_1 = require("../helper/formattedDate");
const response_1 = require("../helper/response");
const Contract_1 = __importDefault(require("../models/Contract"));
const User_1 = __importDefault(require("../models/User"));
const createContract = async (req, res) => {
    try {
        const { supplyVendor, cableDrumCount, cableDelivered, expireAt } = req.body;
        if (req.user.userType !== "admin") {
            return (0, response_1.sendResponse)(res, 400, "You do not have permission to create a contract");
        }
        const IsSupplyVendor = await User_1.default.findById(supplyVendor).select("userType");
        if (!IsSupplyVendor && (IsSupplyVendor === null || IsSupplyVendor === void 0 ? void 0 : IsSupplyVendor.userType) !== "supplyVendor") {
            return (0, response_1.sendResponse)(res, 400, "Supply Vendor not found");
        }
        const newContract = new Contract_1.default({
            supplyVendor,
            cableDrumCount,
            cableDelivered,
            expireAt,
        });
        const contract = newContract.save();
        if (!contract) {
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
// export const getAllContracts = async (req, res) => {
//   try {
//     const contracts = await Contract.find();
//     const modifiedData = contracts.map(
//       ({
//         _id,
//         supplyVendor,
//         cableDrumCount,
//         cableDelivered,
//         expireAt,
//         createAt,
//       }) => ({
//         _id,
//         supplyVendor,
//         cableDrumCount,
//         cableDelivered,
//         expireAt: extractDate(expireAt),
//         createAt: extractDate(createAt),
//       })
//     );
//     // Send modifiedData to the client
//     console.log(modifiedData);
//     sendResponse(res, 201, "", modifiedData);
//   } catch (err) {
//     return handleServerError(res, err);
//   }
// };
const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract_1.default.find().populate("supplyVendor", "username");
        const modifiedData = contracts.map(({ _id, supplyVendor, cableDrumCount, cableDelivered, expireAt, createAt, }) => ({
            _id,
            supplyVendor: supplyVendor,
            cableDrumCount,
            cableDelivered,
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
//# sourceMappingURL=contractController.js.map