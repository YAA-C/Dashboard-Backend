import express from "express";
import multer from "multer";

import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../configs/s3ConfigTebi.js";

import { userModel } from "../models/userModel.js";
import { matchesModel } from "../models/matches.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const matchesRouter = express.Router();

matchesRouter.post("/create/:apikey",upload.single("csvFile"),async (req, res) => {
    try {
      const file = req.file;
      const { apikey } = req.params;

      const user = await userModel.findOne({ apikey });

      if (!user) {
        return res.status(404).json({
          message: "User not found. Please sign up.",
          success: false,
        });
      }

      const upload_data = await s3Client.send(
        new PutObjectCommand({
          Bucket: "yaacs",
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const get_command = new GetObjectCommand({
        Bucket: "yaacs",
        Key: file.originalname,
      });

      const url = await getSignedUrl(s3Client, get_command, {
        expiresIn: 3600,
      });

      const matchData = {
        account_id: user._id,
        tebi_Link: url,
      };

      matchesModel
        .create(matchData)
        .then((savedDocument) => {
          console.log("Document saved successfully:", savedDocument._id);
        })
        .catch((error) => {
          console.error("Error saving document:", error);
        });

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
);
