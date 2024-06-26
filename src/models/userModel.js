import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    apikey: {
      type: String,
      default: "",
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const userModel = mongoose.model("users", userSchema);
