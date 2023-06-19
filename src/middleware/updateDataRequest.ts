import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./auth";
import User from "../models/User";
import { sendResponse } from "../helper/response";

export const updateDataRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.userId;
  console.log("un?", userId);

  if (!userId) {
    return res.status(403).json({ success: false, message: "User not found" });
  }

  try {
    const user = await User.findById(userId).select(
      "_id username email userType"
    );

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found" });
    }

    req.user = {
      userId: userId,
      username: user.username,
      userType: user.userType,
      email: user.email,
    };

    next();
  } catch (error) {
    sendResponse(res, 403, "Invalid access token");
  }
};
