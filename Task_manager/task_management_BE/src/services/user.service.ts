import mongoose, { Schema } from "mongoose";
import { User } from "@models";
import { BaseQueryParamsDTO } from "@interfaces";
import { MESSAGES } from "@constants";
import { DataAlreadyExistsError, NotFoundError } from "@utils";

export class UserService {
  public async findAll(query: BaseQueryParamsDTO) {
    const pageNum = Number(query?.pageNum) || 1;
    const limit = Number(query?.pageLimit) || 10;
    const skip = (pageNum - 1) * limit;

    const pipeline: any = [
      {
        $match: {
          isDeleted: { $ne: true },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: "count" }],
        },
      },
    ];

    const result = await User.aggregate(pipeline);
    const users = result[0]?.data || [];
    const total = result[0]?.total?.[0]?.count || 0;

    return {
      users,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limit),
    };
  }

  public async findById(id: string) {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
      isDeleted: { $ne: true },
    })
      .select("-password -__v")
      .lean();

    if (!user) {
      throw new NotFoundError(null, MESSAGES.USER_NOT_FOUND);
    }

    return user;
  }

  public async create(userData: any) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new DataAlreadyExistsError(null, MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const user = new User(userData);
    return (await user.save()).toObject();
  }

  public async update(id: string, userData: any) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), isDeleted: { $ne: true } },
      userData,
      { new: true, projection: { password: 0, __v: 0 } }
    ).lean();

    if (!updatedUser) {
      throw new NotFoundError(null, MESSAGES.USER_NOT_FOUND);
    }

    return updatedUser;
  }

  public async delete(id: string) {
    const deletedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true, projection: { password: 0, __v: 0 } }
    ).lean();

    if (!deletedUser) {
      throw new NotFoundError(null, MESSAGES.USER_NOT_FOUND);
    }

    return deletedUser;
  }
}
