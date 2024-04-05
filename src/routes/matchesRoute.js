import express from "express";
import multer from "multer";
import crypto from "crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../configs/s3ConfigTebi.js";

import { userModel } from "../models/userModel.js";
import { matchesModel } from "../models/matches.js";

import connector from "../../connector.js";

import dotenv from "dotenv";
dotenv.config();

const TEBI_uri = process.env.TEBI_uri;
const TEBI_bucket = process.env.TEBI_bucket;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export const matchesRouter = express.Router();

matchesRouter.post(
  "/create/:apikey",
  upload.single("csvFile"),
  async (req, res) => {
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

      const fileKey= generateRandomString(64);

      const upload_data = await s3Client.send(
        new PutObjectCommand({
          Bucket: TEBI_bucket,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const url = `${TEBI_uri}/${TEBI_bucket}/${fileKey}`;

      const matchData = {
        account_id: user._id,
        tebi_Link: url,
      };

      matchesModel
        .create(matchData)
        .then((savedDocument) => {
          console.log("Document saved successfully:", savedDocument._id);
          connector.sendData({
            "url": url,
            "match_id": savedDocument._id
          });
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
