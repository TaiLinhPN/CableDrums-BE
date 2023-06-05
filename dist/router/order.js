"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const orderController_1 = require("../controllers/orderController");
const updateDataRequest_1 = require("../middleware/updateDataRequest");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// @router POST api/user/register
// @desc Register user
// @access Public
router.post("/create", auth_1.verifyToken, updateDataRequest_1.updateDataRequest, validation_1.createOrderValidation, orderController_1.createOrder);
router.post("/update/:orderId", auth_1.verifyToken, updateDataRequest_1.updateDataRequest, validation_1.updateOrderValidation, orderController_1.updateOrder);
router.get("/get-all", auth_1.verifyToken, updateDataRequest_1.updateDataRequest, orderController_1.getAllOrders);
exports.default = router;
//# sourceMappingURL=order.js.map