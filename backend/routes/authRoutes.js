import express from "express";
import { login } from "../controllers/authController.js";
import { register } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});


export default router;
