"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDateTime = exports.extractDate = void 0;
const extractDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};
exports.extractDate = extractDate;
const extractDateTime = (dateTime) => {
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const formattedDateTime = `${hours}:${minutes} ${day}-${month}-${year}`;
    return formattedDateTime;
};
exports.extractDateTime = extractDateTime;
//# sourceMappingURL=formattedDate.js.map