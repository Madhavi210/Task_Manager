import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "@config";
import { STATUSCODES, MESSAGES } from "@constants";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(STATUSCODES.UNAUTHORISED_STATUS).json({
      status: false,
      message: MESSAGES.TOKEN_REQUIRED,
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      ENV.JWT.JWT_SECRET as string
    ) as JwtPayload;

    req.user = {
      id: decoded.id ?? decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(STATUSCODES.UNAUTHORISED_STATUS).json({
      status: false,
      message: MESSAGES.INVALID_TOKEN,
    });
    return;
  }
};

export type { AuthenticatedRequest };
