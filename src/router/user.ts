import express from "express";
import {
  createUser,
  findUser,
  getUsers,
  removeUser,
} from "../controllers/userContoller";
import { userCreateValidation } from "../middleware/validation";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/find", verifyToken, findUser);
router.get("/get-all", verifyToken, getUsers);
router.delete("/delete/:userId", verifyToken, removeUser);
router.post("/create", userCreateValidation, verifyToken, createUser);

export default router;
