import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: String,
  url: String,
  name: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.models.File || mongoose.model("File", fileSchema);
