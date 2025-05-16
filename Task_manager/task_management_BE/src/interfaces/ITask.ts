import { TaskStatus } from "@constants";
import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  subtasks: string[];
  status: TaskStatus;
  isDeleted: Boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
