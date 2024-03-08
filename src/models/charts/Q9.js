import mongoose from "mongoose";

const q9Schema = new mongoose.Schema(
  {
    sniper: {
      labels: {
        type: [String],
        required: true,
      },
      data: {
        type: [Number],
        required: true,
      },
    },
    scopingAR: {
      labels: {
        type: [String],
        required: true,
      },
      data: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const q9Model = mongoose.model("nines", q9Schema);
