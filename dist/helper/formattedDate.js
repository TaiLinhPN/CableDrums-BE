"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDate = void 0;
function extractDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}
exports.extractDate = extractDate;
//# sourceMappingURL=formattedDate.js.map