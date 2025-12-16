import express from "express";
import { getLabContent } from "../controllers/labController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getLabContent);

export default router;
