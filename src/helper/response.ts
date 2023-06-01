import { Response } from "express";

export function handleServerError(res: Response, error: any) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
}

export function sendResponse(
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) {
  return res.status(statusCode).json({ message, data });
}
