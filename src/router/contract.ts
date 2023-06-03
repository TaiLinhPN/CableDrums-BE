import express from "express";
import {
  createContract,
  getAllContracts,
} from "../controllers/contractController";
import { verifyToken } from "../middleware/auth";
import { updateDataRequest } from "../middleware/updateDataRequest";

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public

router.post("/create", verifyToken, updateDataRequest, createContract);
router.get("/get-all", verifyToken, getAllContracts);

export default router;
