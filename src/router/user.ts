import express from "express";
import { findUser, getUsers } from "../controllers/userContoller";

const router = express.Router();

router.post("/find", findUser);
router.get("/get-all", getUsers);

export default router;