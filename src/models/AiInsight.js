import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({
  fileId: String,
  englishSummary: String,
  urduSummary: String,
});

export default mongoose.models.AiInsight || mongoose.model("AiInsight", aiInsightSchema);
