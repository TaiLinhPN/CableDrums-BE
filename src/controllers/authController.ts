import { Request, Response } from "express";
import argon2 from "argon2";
import User from "../models/User";
import { generateToken } from "../utils/tokenUtils";
import { mailRegister } from "../utils/mailUtils";
import { response } from "../utils/responseUtils";

const register = async (req: Request, res: Response) => {
  const { username, password, email, userType } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      email,
      userType,
      password: hashedPassword,

    });

    newUser.save();
    mailRegister("Your account has been created by Admin", email);
    response(res, 200, true, "user successfully registered");
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Internal server error");
  }
};



const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, false, "Incorrect email or password?");
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return response(res, 400, false, "Incorrect email or password?");
    }
    const token = generateToken(user._id);
    const publicUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType
    };

    // updateRefreshToken(user._id, token.refreshToken);
    response(res, 200, true, "Login successful", {
      token,
      user: publicUser,
    });
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Internal server error");
  }
};

export { register, login };
