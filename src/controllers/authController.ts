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
      console.log("user");
      
      return sendResponse(res, 401, "Incorrect email or password?");
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      console.log("pass");

      return sendResponse(res, 401, "Incorrect email or password?");
    }

    if (password === "qwert@123!") {
      return sendResponse(res, 201, "password defaults, reset password");
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
