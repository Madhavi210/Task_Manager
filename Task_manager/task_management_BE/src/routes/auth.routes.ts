import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);  //api/auth/login

export { authRoutes };
