"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDataOrder = exports.formatContractData = void 0;
const formattedDate_1 = require("./formattedDate");
const formatContractData = (data) => {
    const modifiedData = data.map(({ _id, contractName, supplyVendor, cableDrumCount, cableDelivered, cableRequired, expireAt, createAt, }) => ({
        _id,
        contractName,
        supplyVendor: supplyVendor,
        cableDrumCount,
        cableDelivered,
        cableRequired,
        expireAt: (0, formattedDate_1.extractDate)(expireAt),
        createAt: (0, formattedDate_1.extractDate)(createAt),
    }));
    return modifiedData;
};
exports.formatContractData = formatContractData;
const formatDataOrder = (orders) => {
    const result = orders.map((order) => ({
        supplyVendor: order.supplyVendorId,
        planner: order.plannerId,
        projectContractor: order.projectContractorId,
        _id: order._id,
        orderName: order.orderName,
        contract: order.contractId,
        cableDrumsToWithdraw: order.cableDrumsToWithdraw,
        status: order.status,
        notes: order.notes.map((note) => ({
            username: note.username,
            time: (0, formattedDate_1.extractDateTime)(note.time),
            message: note.message || undefined,
        })),
        createdAt: (0, formattedDate_1.extractDate)(order.createAt),
    }));
    return result;
};
exports.formatDataOrder = formatDataOrder;
//# sourceMappingURL=formattedData.js.map