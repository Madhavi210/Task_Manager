import { Request, Response, NextFunction } from "express";
import { UserService } from "@services";
import { MESSAGES, STATUSCODES } from "@constants";
import { createUserSchema } from "@validators";
import { logger } from "@utils";

export class UserController {
  private readonly userService = new UserService();

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.body;
      const users = await this.userService.findAll(query);
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: users,
        message: MESSAGES.SUCCESS_MESSAGE,
      });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = req.params.id;
      const user = await this.userService.findById(userId);
      if (!user) {
        return res.status(STATUSCODES.NOT_FOUND).json({
          status: false,
          message: MESSAGES.USER_NOT_FOUND,
        });
      }
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: user,
        message: MESSAGES.SUCCESS_MESSAGE,
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userData = req.body;
      await createUserSchema.validate(req.body, {
        abortEarly: false,
      });
      const newUser = await this.userService.create(userData);
      logger.info("API post/api/user hit successfully");
      res.status(STATUSCODES.CREATED_STATUS).json({
        status: true,
        data: newUser,
        message: MESSAGES.USER_CREATED_SUCCESFULLY,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const updatedUser = await this.userService.update(userId, userData);
      if (!updatedUser) {
        return res.status(STATUSCODES.NOT_FOUND).json({
          status: false,
          message: MESSAGES.USER_NOT_FOUND,
        });
      }
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: updatedUser,
        message: MESSAGES.USER_UPDATED_SUCCESFULLY,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userId = req.params.id;
      const deletedUser = await this.userService.delete(userId);
      if (!deletedUser) {
        return res.status(STATUSCODES.NOT_FOUND).json({
          status: false,
          message: MESSAGES.USER_NOT_FOUND,
        });
      }
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        data: deletedUser,
        message: MESSAGES.USER_DELETED,
      });
    } catch (error) {
      next(error);
    }
  };
}
