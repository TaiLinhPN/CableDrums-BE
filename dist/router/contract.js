"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contractController_1 = require("../controllers/contractController");
const auth_1 = require("../middleware/auth");
const updateDataRequest_1 = require("../middleware/updateDataRequest");
const router = express_1.default.Router();
// @router POST api/user/register
// @desc Register user
// @access Public
router.post("/create", auth_1.verifyToken, updateDataRequest_1.updateDataRequest, contractController_1.createContract);
router.get("/get-all", auth_1.verifyToken, updateDataRequest_1.updateDataRequest, contractController_1.getAllContracts);
exports.default = router;
//# sourceMappingURL=contract.js.map