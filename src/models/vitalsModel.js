import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema({
  userId: String,
  bp: String,
  sugar: String,
  weight: String,
  date: { type: Date, default: Date.now },
  notes: String,
});

export default mongoose.models.Vitals || mongoose.model("Vitals", vitalsSchema);
