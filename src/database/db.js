import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected.");
    return;
  }

  try {
    const mongoUri = process.env.NEXT_PUBLIC_MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI not defined in .env.local");
    }
    await mongoose.connect(mongoUri, {
      dbName: "nextAuthApp",
    });
    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// 👇 Add this line at the end
export default connectDB;
