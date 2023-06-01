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

router.post("/find", findUser);
router.get("/get-all", getUsers);
router.delete("/delete/:userId", removeUser);
router.post("/create", userCreateValidation, createUser);

export default router;
