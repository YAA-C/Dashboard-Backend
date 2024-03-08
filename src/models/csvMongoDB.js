import mongoose from "mongoose";

const csvMongoSchema = new mongoose.Schema({
  content: String,
},{
  versionKey: false,
  timestamps: true
});

export const csvMongoModel = mongoose.model("csvs", csvMongoSchema);
