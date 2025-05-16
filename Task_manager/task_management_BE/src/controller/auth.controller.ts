import { Request, Response, NextFunction } from "express";
import { AuthService } from "@services";
import { STATUSCODES, MESSAGES } from "@constants";

export class AuthController {
  private readonly authService = new AuthService();

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(STATUSCODES.BADREQUEST_STATUS).json({
          status: false,
          message: MESSAGES.MISSING_CREDENTIALS,
        });
      }

      const result = await this.authService.login(email, password);
      res.status(STATUSCODES.SUCCESS_STATUS).json({
        status: true,
        message: MESSAGES.LOGIN_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
