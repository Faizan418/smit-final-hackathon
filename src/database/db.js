import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI; 
    if (!mongoUri) throw new Error("❌ MONGO_URI not defined in environment variables");

    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected.");
      return;
    }

    await mongoose.connect(mongoUri, {
      dbName: "nextAuthApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};
