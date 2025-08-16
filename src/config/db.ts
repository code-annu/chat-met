import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGODB_URI!;
  const DB_NAME = process.env.MONGODB_DATABASE_NAME!;
  try {
    await mongoose.connect(uri, { dbName: DB_NAME });
    console.log("🚀 MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
