import express, { Router } from "express";
import { userRoutes } from "./user.routes";
import { taskRoutes } from "./task.routers";
import { authenticate } from "../middlewares/jwt.middleware";
import { authRoutes } from "./auth.routes";

const router: Router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/tasks", authenticate, taskRoutes);

export default router;
