import express from "express";
import { findUser } from "../controllers/userContoller";

const router = express.Router();

router.post("/find", findUser);

export default router;