import { Router } from "express";
import { UserController } from "../controller/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.getAllUsers);         // GET /api/users/
userRoutes.post("/", userController.createUser);         // POST /api/users/
userRoutes.get("/:id", userController.getUserById);      // GET /api/users/:id
userRoutes.put("/:id", userController.updateUser);       // PUT /api/users/:id
userRoutes.delete("/:id", userController.deleteUser);    // DELETE /api/users/:id

export { userRoutes };
