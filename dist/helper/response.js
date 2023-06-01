"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.handleServerError = void 0;
function handleServerError(error, res) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
}
exports.handleServerError = handleServerError;
function sendResponse(res, statusCode, message, data) {
    return res.status(statusCode).json({ message, data });
}
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.js.map