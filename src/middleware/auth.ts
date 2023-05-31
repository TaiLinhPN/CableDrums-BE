import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { handleServerError, sendResponse } from "../helper/response";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { userId: string };

    if ((req.userId = decoded.userId)) {
      next();
    } else sendResponse(res, 403, "Invalid access token");
  } catch (error) {
    handleServerError(res, error);
  }
};
