import { Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  profilePic?: string;
  isDeleted?: boolean;
  deletedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
