"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// @router POST api/user/register
// @desc Register user
// @access Public
router.post("/login", validation_1.userLoginValidation, authController_1.login);
router.post("/reset-password", authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map