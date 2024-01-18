import mongoose from "mongoose";

const csvMongoSchema = new mongoose.Schema({
  content: String,
});

export const csvMongoModel = mongoose.model("csvs", csvMongoSchema);
