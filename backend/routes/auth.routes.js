import express from "express";
import { checkAuth, login, logout, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check", checkAuth);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", isAuthenticated, logout);

export default router;
