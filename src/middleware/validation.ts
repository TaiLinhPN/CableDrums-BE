import { Request, Response } from "express";
import User from "../models/User";
import { handleServerError, sendResponse } from "../helper/response";
import {
  loginSchema,
  registerSchema,
} from "../validation/userValidationSchema";
import { AuthenticatedRequest } from "./auth";
import Contract from "../models/Contract";
import { cablesAvailable } from "../helper/cableAvalable";
import { checkUser } from "../helper/checkUser";
import Order from "../models/Oder";

export const userCreateValidation = async (
  req: Request,
  res: Response,
  next: any
) => {
  const validation = registerSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + " is not a valid",
    });
  }
  let { email } = req.body;
  try {
    email = await User.findOne({ email });
    if (email) {
      return sendResponse(res, 400, "email already exists");
    }
    next();
  } catch (error) {
    return handleServerError(res, error);
  }
};

export const userLoginValidation = (req: Request, res: Response, next: any) => {
  const validation = loginSchema.validate(req.body);

  if (validation.error) {
    return res.status(401).json({
      errors: validation.error.details[0].path[0] + " is not a valid",
    });
  }

  next();
};

export const createContractValidation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: any
) => {
  if (req.user.userType !== "admin") {
    return sendResponse(
      res,
      400,
      "You do not have permission to create a contract"
    );
  }
  const isSupplyVendor = await checkUser(
    req.body.supplyVendorId,
    "supplyVendor"
  );
  if (!isSupplyVendor) {
    return sendResponse(res, 400, "Supply Vendor not found");
  }
  next();
};

export const createOrderValidation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: any
) => {
  const { contractId, projectContractorId, cableDrumsToWithdraw } = req.body;
  if (req.user.userType !== "planner") {
    return sendResponse(
      res,
      400,
      "You do not have permission to create a order."
    );
  }

  try {
    const contract = await Contract.findById(contractId);
    if (!contract) {
      return sendResponse(res, 400, "Contract not found.");
    }
    const cableDrumsAvailable = cablesAvailable(contract);

    if ((cableDrumsToWithdraw as number) > cableDrumsAvailable) {
      return sendResponse(
        res,
        400,
        "The required number of cable drums exceeds the available cable drums"
      );
    }

    const isProjectContractor = await checkUser(
      projectContractorId,
      "projectContractor"
    );
    if (!isProjectContractor) {
      return sendResponse(res, 400, "Project Contractor not found");
    }
    req.body.contract = contract;
    next();
  } catch (error) {
    console.log(error);
    return;
  }
};

export const updateOrderValidation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: any
) => {
  const orderId = req.params.orderId;
  const { status } = req.body;
  const userType = req.user.userType;
  const userId = req.user.userId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    if (order.status === "completed") {
      return sendResponse(res, 400, "Order has already been completed");
    }

    if (
      (userType === "supplyVendor" &&
        order.supplyVendorId.toString() === userId) ||
      (userType === "projectContractor" &&
        order.projectContractorId.toString() === userId)
    ) {
      if (
        (order.status === "newRequest" && status === "readyForPickup") ||
        (order.status === "readyForPickup" && status === "completed")

        // ( order.status === "newRequest" && status === "inPreparation"  ) ||
        // (order.status === "inPreparation" && status === "readyForPickup") ||
        // (order.status === "readyForPickup" && status === "delivered") ||
        // (order.status === "delivered" && status === "inTransit") ||
        // (order.status === "inTransit" && status === "completed")
      ) {
        return next();
      } else {
        return sendResponse(res, 400, "Invalid order status transition");
      }
    } else {
      return sendResponse(
        res,
        400,
        "You do not have permission to update the order"
      );
    }
  } catch (error) {
    handleServerError(res, error);
  }
};
