import express from "express";
import { verifyToken } from "../middleware/auth";
import { updateDataRequest } from "../middleware/updateDataRequest";
import { deleteNotification, getNotification, markNotificationAsRead } from "../controllers/notificationController";

const router = express.Router();

router.get("/get-all", verifyToken, updateDataRequest, getNotification);
router.get("/delete/:id", verifyToken, deleteNotification);
router.get("/mark-as-read/:id", verifyToken, markNotificationAsRead);

export default router;
