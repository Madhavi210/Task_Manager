import { User } from "@models";
import jwt from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "@utils";
import { MESSAGES } from "@constants";

export class AuthService {
  public async login(email: string, password: string) {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new NotFoundError(null, MESSAGES.USER_NOT_FOUND);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError(null, MESSAGES.INVALID_CREDENTIALS);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    };
  }
}
