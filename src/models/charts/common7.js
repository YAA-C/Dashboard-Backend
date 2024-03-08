import mongoose from "mongoose";

const commonSchema = new mongoose.Schema(
  {
    labels: {
      type: [String],
      required: true,
    },
    data: {
      type: [Number],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const barModel = mongoose.model("bars", commonSchema);
export const pieModel = mongoose.model("pies", commonSchema);
