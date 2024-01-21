import mongoose from "mongoose";

const csvTebiSchema = new mongoose.Schema(
  {
    filename: String,
    originalname: String,
    contentType: String,
    size: Number,
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const csvTebiModel = mongoose.model("tebimetadatas", csvTebiSchema);
