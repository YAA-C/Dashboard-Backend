import express from "express";
import multer from "multer";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../configs/s3ConfigTebi.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const matchesRouter = express.Router();

matchesRouter.post("/create", upload.single("csvFile"), async (req, res) => {
  try {
    const file = req.file;

    const upload_data = await s3Client.send(
      new PutObjectCommand({
        Bucket: "yaacs",
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    res
      .status(200)
      .json({
        message: "File uploaded successfully",
        data: upload_data,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});
