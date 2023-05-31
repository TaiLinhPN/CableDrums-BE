import express from "express";
import { login } from "../controllers/authController";
import { userLoginValidation } from "../middleware/validation";

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public

router.post("/login", userLoginValidation, login);

export default router;
