import { handleServerError, sendResponse } from "../helper/response";
import User from "../models/User";
import { mailRegister } from "../helper/sendMail";
import argon2 from "argon2";
import { sendNotification } from "../helper/notification";

export const findUser = async (req, res) => {
  const { query } = req.body;
  const searchString = String(query);
  try {
    const users = await User.find(
      {
        $or: [
          { email: { $regex: searchString, $options: "i" } },
          { username: { $regex: searchString, $options: "i" } },
        ],
      },
      "_id username email avatar"
    );

    sendResponse(res, 201, "get user successful", users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username email userType");
    if (!users) {
      sendResponse(res, 500, "Server Error");
    }
    sendResponse(res, 201, "get all users successfully", users);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user && user.userType !== "admin") {
      const isDeleteUser = await User.findByIdAndDelete(userId);
      if (isDeleteUser) {
        global._io.emit("remove-account", userId);
        return sendResponse(res, 204, "User has been deleted");
      }
    }
    return sendResponse(
      res,
      404,
      "User not found or you do not have permission to delete an Admin account"
    );
  } catch (error) {
    return handleServerError(res, error);
  }
};

export const createUser = async (req, res) => {
  const senderId = req.user.userId
  const { username, email, userType } = req.body;
  try {
    const password = await argon2.hash("qwert@123");
    const newUser = new User({
      username,
      email,
      userType,
      password,
    });
    newUser.save();
    const publicUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      userType: newUser.userType,
    };
    global._io.emit("new-account", publicUser);
    sendNotification(senderId, publicUser._id, `Your account has been created`);
    mailRegister("Your account has been created", email);
    sendResponse(res, 200, "user successfully created");
  } catch (err) {
    return handleServerError(res, err);
  }
};
