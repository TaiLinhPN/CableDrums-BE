import { Request, Response } from "express";
import User from "../models/User";
import { handleServerError, sendResponse } from "../helper/response";
import {
  loginSchema,
  registerSchema,
} from "../validation/userValidationSchema";

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
    return res.status(400).json({
      errors: validation.error.details[0].path[0] + " is not a valid",
    });
  }

  next();
};

export const createContractValidation = (req: Request, res: Response, next: any) => {
  
};