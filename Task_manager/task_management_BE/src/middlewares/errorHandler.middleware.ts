import { MESSAGES, STATUSCODES } from "@constants";
import { Request, Response, NextFunction } from "express";

function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    statusCode = STATUSCODES.INTERNAL_SERVER,
    status = false,
    message = MESSAGES.SERVER_ERROR_MESSAGE,
    data = null,
  } = err;
  res.status(statusCode).json({ status, data, message });
}

export { globalErrorHandler };
