import { Task } from "@models";
import {
  AuthenticatedRequest,
} from "./../middlewares/jwt.middleware";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";
import { createTaskSchema } from "@validators";
import { STATUSCODES, MESSAGES } from "@constants";
import mongoose, { Types } from "mongoose";
import createHttpError from "http-errors";
import { logger } from "@utils";
import { ITask } from "@interfaces";

export class TaskController {
  private readonly taskService = new TaskService();

  public createTask = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);

      await createTaskSchema.validate(req.body, { abortEarly: false });
      const newTask = await this.taskService.create({
        ...req.body,
        user: userId,
      });
      logger.info("Task created successfully");
      res.status(STATUSCODES.CREATED_STATUS).json({
        status: true,
        data: newTask,
        message: MESSAGES.TASK_CREATED,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllTasks = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);
      const tasks = await this.taskService.findAll({
        ...req.body,
        user: userId,
      });
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: tasks,
        message: MESSAGES.SUCCESS_MESSAGE,
      });
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const task = await this.taskService.findById(req.params.id);
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: task,
        message: MESSAGES.SUCCESS_MESSAGE,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const taskId = req.params.id;

      if (!Types.ObjectId.isValid(taskId)) {
        throw createHttpError(400, "Invalid Task ID");
      }

      const updatedTask = await this.taskService.update(taskId, req.body);
      if (!updatedTask) {
        return res.status(STATUSCODES.NOT_FOUND).json({
          status: false,
          message: MESSAGES.TASK_NOT_FOUND,
        });
      }

      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: updatedTask,
        message: MESSAGES.TASK_UPDATED,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const taskId = req.params.id;

      if (!Types.ObjectId.isValid(taskId)) {
        throw createHttpError(400, "Invalid Task ID");
      }

      const deleted = await this.taskService.delete(taskId);
      if (!deleted) {
        return res.status(STATUSCODES.NOT_FOUND).json({
          status: false,
          message: MESSAGES.TASK_NOT_FOUND,
        });
      }

      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: deleted,
        message: MESSAGES.TASK_DELETED,
      });
    } catch (error) {
      next(error);
    }
  };
}
