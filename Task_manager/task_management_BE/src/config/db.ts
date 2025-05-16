import mongoose from "mongoose";
import { ENV } from "@config";

export async function connectDB() {
  try {
    if (!ENV.DB.DB_URL) {
      throw new Error("DB_URL is not defined");
    }
    await mongoose.connect(ENV.DB.DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
