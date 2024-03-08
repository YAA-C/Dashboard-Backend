import mongoose from "mongoose";

const histSchema = new mongoose.Schema(
  {
    histData: {
      type: [Number],
      required: true,
    },
    edges: {
      type: [Number],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const histModel = mongoose.model("hists", histSchema);
