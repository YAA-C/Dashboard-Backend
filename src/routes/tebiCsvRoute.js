import express from "express";
import multer from "multer";
import crypto from "crypto";

import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../tebi/s3Config.js";

const tebiRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { csvTebiModel } from "../models/csvTebi.js";

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

tebiRouter.post("/upload", upload.single("csvFile"), async (req, res) => {
  try {
    const file = req.file;
    const fileKey = `${generateRandomString(64)}.csv`;

    // Upload file to Tebi Object Storage
    const upload_data = await s3Client.send(
      new PutObjectCommand({
        Bucket: "yaacs",
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Save file metadata to MongoDB
    const newCsv = new csvTebiModel({
      filename: fileKey,
      originalname: file.originalname,
      contentType: file.mimetype,
      size: file.size,
    });

    await newCsv.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", data: upload_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

tebiRouter.get("/latest", async (req, res) => {
  try {
    // Find the latest added CSV file in the database
    const latestCsv = await csvTebiModel.findOne(
      {},
      {},
      { sort: { created_at: -1 } }
    );

    if (!latestCsv) {
      return res.status(404).json({ message: "No CSV file found" });
    }

    // Generate a presigned URL for the latest file
    const get_command = new GetObjectCommand({
      Bucket: "yaacs",
      Key: latestCsv.filename,
    });

    const url = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });

    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { tebiRouter };
