import express from "express";
import multer from "multer";

import { csvMongoModel } from "../models/csvMongoDB.js";
import { userModel } from "../models/userModel.js";

const mongoCsvRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoCsvRouter.post("/upload", upload.single("csvFile"), async (req, res) => {
  try {
    const { apikey } = req.body;
    const isValidApi = await userModel.findOne({ apikey:apikey });

    if (!isValidApi) {
      return res.status(401).json({ error: "Invalid API Key!" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No CSV file provided" });
    }

    const content = req.file.buffer.toString();
    const newCsv = new csvMongoModel({ content });
    await newCsv.save();

    res.status(201).json({ message: "CSV file uploaded successfully" });
  } catch (error) {
    console.error("Error uploading CSV file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoCsvRouter.post("/csv/:id", async (req, res) => {
  try {
    const { apikey } = req.body;
    const isValidApi = await userModel.findOne({ apikey });

    if (!isValidApi) {
      return res.status(401).json({ error: "Invalid API Key!" });
    }

    const csv = await csvMongoModel.findById(req.params.id);
    if (!csv) {
      return res.status(404).json({ error: "CSV file not found" });
    }
    res.status(200).send(csv.content);
  } catch (error) {
    console.error("Error retrieving CSV file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoCsvRouter.post("/latest", async (req, res) => {
  try {
    const { apikey } = req.body;
    const isValidApi = await userModel.findOne({ apikey });

    if (!isValidApi) {
      return res.status(401).json({ error: "Invalid API Key!" });
    }

    const latestCsv = await csvMongoModel.findOne(
      {},
      {},
      { sort: { _id: -1 } }
    );
    res.status(200).json(latestCsv);
  } catch (error) {
    console.error("Error fetching latest CSV file ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { mongoCsvRouter };
