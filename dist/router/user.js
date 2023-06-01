"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userContoller_1 = require("../controllers/userContoller");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/find", userContoller_1.findUser);
router.get("/get-all", userContoller_1.getUsers);
router.delete("/delete/:userId", userContoller_1.removeUser);
router.post("/create", validation_1.userCreateValidation, userContoller_1.createUser);
router.post("/updatePassword", auth_1.verifyToken, userContoller_1.updatePassword);
exports.default = router;
//# sourceMappingURL=user.js.map