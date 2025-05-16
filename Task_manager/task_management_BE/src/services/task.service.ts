import { Task } from "@models";
import { BaseQueryParamsDTO, ITask } from "@interfaces";
import { MESSAGES } from "@constants";
import { NotFoundError } from "@utils";
import mongoose from "mongoose";

export class TaskService {
  public async findAll(query: BaseQueryParamsDTO) {
    const pageNum = Number(query?.pageNum) || 1;
    const limit = Number(query?.pageLimit) || 10;
    const skip = (pageNum - 1) * limit;
    const userId = query.user;
    const pipeline: any = [
      {
        $match: {
          isDeleted: { $ne: true },
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          data: [],
          total: [{ $count: "count" }],
        },
      },
    ];
    const result = await Task.aggregate(pipeline);
    const tasks = result[0]?.data || [];
    const total = result[0]?.total?.[0]?.count || 0;

    return {
      tasks,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async findById(id: string) {
    const task = await Task.findOne({
      _id: new mongoose.Types.ObjectId(id),
      isDeleted: { $ne: true },
    }).lean();

    if (!task) {
      throw new NotFoundError(null, MESSAGES.TASK_NOT_FOUND);
    }

    return task;
  }

  public async create(taskData: ITask) {
    const task = new Task(taskData);
    return (await task.save()).toObject();
  }

  public async update(id: string, taskData: ITask) {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), isDeleted: { $ne: true } },
      taskData,
      { new: true }
    ).lean();

    if (!updatedTask) {
      throw new NotFoundError(null, MESSAGES.TASK_NOT_FOUND);
    }

    return updatedTask;
  }

  public async delete(id: string) {
    const deletedTask = await Task.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    ).lean();

    if (!deletedTask) {
      throw new NotFoundError(null, MESSAGES.TASK_NOT_FOUND);
    }

    return deletedTask;
  }
}
