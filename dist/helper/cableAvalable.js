"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cablesAvailable = void 0;
const cablesAvailable = (contract) => {
    return (contract.cableDrumCount -
        contract.cableDelivered -
        contract.cableRequired);
};
exports.cablesAvailable = cablesAvailable;
//# sourceMappingURL=cableAvalable.js.map