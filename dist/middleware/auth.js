"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../helper/response");
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json({ success: false, message: "Access token not found" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            userId: decoded.userId,
        };
        next();
    }
    catch (error) {
        (0, response_1.sendResponse)(res, 403, "Invalid access token");
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map