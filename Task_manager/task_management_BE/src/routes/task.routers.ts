import { authenticate } from './../middlewares/jwt.middleware';
import { Router } from "express";
import { TaskController } from "../controller/task.controller";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post("/", taskController.createTask);         // POST /api/tasks
taskRoutes.get("/", taskController.getAllTasks);         // GET /api/tasks
taskRoutes.get("/:id", taskController.getTaskById);      // GET /api/tasks/:id
taskRoutes.put("/:id", taskController.updateTask);       // PUT /api/tasks/:id
taskRoutes.delete("/:id", taskController.deleteTask);    // DELETE /api/tasks/:id

export { taskRoutes };
