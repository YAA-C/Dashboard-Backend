import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const TEBI_accessKeyId = process.env.TEBI_accessKeyId;
const TEBI_secretKey = process.env.TEBI_secretKey;

const credentials = {
  accessKeyId: TEBI_accessKeyId,
  secretAccessKey: TEBI_secretKey,
};

export const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global",
});

