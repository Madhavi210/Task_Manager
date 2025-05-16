import mongoose, { Schema, Document } from "mongoose";
import { TaskStatus } from "@constants";
import { ITask } from "@interfaces";
import { User } from "@models";

const taskSchema: Schema<ITask> = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    subtasks: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export { Task };
