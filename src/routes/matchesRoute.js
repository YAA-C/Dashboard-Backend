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

// Middleware to verify API key
const verifyApiKey = async (req, res, next) => {
  try {
    const { API_KEY } = req.body;

    if (!API_KEY) {
      return res.status(400).json({
        message: "API key is required",
        success: false,
      });
    }

    const user = await userModel.findOne({ apikey: API_KEY });

    if (!user) {
      return res.status(404).json({
        message: "Wrong API key !!",
        success: false,
      });
    }

    // Attach user to request object
    req.user = user;
    console.log("API verified !!");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

matchesRouter.post(
  "/create",
  upload.single("csvFile"),
  verifyApiKey,
  async (req, res) => {
    try {
      const file = req.file;
      const { API_KEY, ...formFields } = req.body;

      const user = req.user; // Access the user from the request object

      const fileKey = generateRandomString(64);

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

      const savedDocument = await matchesModel.create(matchData);

      console.log("Document saved successfully:", savedDocument._id);

      await connector.sendData({
        url: url,
        match_id: savedDocument._id,
      });

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }
);