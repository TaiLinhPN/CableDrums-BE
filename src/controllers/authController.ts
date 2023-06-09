import { Request, Response } from "express";
import argon2 from "argon2";
import User from "../models/User";
import { generateToken } from "../utils/tokenUtils";
import { handleServerError, sendResponse } from "../helper/response";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, "Incorrect email or password?");
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return sendResponse(res, 401, "Incorrect email or password?");
    }
    if (checkDefaultPassword(password)) {
      return sendResponse(res, 400, "password defaults, reset password");
    }

    const token = generateToken(user._id);
    const publicUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    };

    sendResponse(res, 200, "Login successfully", {
      token,
      user: publicUser,
    });
  } catch (err) {
    return handleServerError(res, err);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  console.log(password, email);
  if (checkDefaultPassword(password)) {
    return sendResponse(res, 400, "password defaults, enter another password");
  }

  try {
    const passwordHashed = await argon2.hash(password);
    console.log("passwordHashed", passwordHashed);

    const newPassword = await User.findOneAndUpdate(
      { email: email },
      { password: passwordHashed }
    );
    console.log("what", newPassword);

    if (!newPassword) {
      return sendResponse(res, 404, "Email not found");
    }
    sendResponse(res, 200, "Update password successfully");
  } catch (error) {
    return handleServerError(res, error);
  }
};

const checkDefaultPassword = (password: string) => {
  if (password === "qwert@123!") {
    return true;
  } else return false;
};
