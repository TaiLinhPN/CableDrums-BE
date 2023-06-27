"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userContoller_1 = require("../controllers/userContoller");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const updateDataRequest_1 = require("../middleware/updateDataRequest");
const router = express_1.default.Router();
router.post("/find", auth_1.verifyToken, userContoller_1.findUser);
router.get("/get-all", auth_1.verifyToken, userContoller_1.getUsers);
router.delete("/delete/:userId", auth_1.verifyToken, userContoller_1.removeUser);
router.post("/create", validation_1.userCreateValidation, auth_1.verifyToken, updateDataRequest_1.updateDataRequest, userContoller_1.createUser);
exports.default = router;
//# sourceMappingURL=user.js.map