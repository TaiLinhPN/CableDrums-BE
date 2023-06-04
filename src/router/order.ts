import express from "express";

import { verifyToken } from "../middleware/auth";
import { createOrder, updateOrder } from "../controllers/orderController";
import { updateDataRequest } from "../middleware/updateDataRequest";
import { createOrderValidation, updateOrderValidation } from "../middleware/validation";

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public

router.post(
  "/create",
  verifyToken,
  updateDataRequest,
  createOrderValidation,
  createOrder
);

router.post(
  "/update/:orderId",
  verifyToken,
  updateDataRequest,
  updateOrderValidation,
  updateOrder
);

export default router;
