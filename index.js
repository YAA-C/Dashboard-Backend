import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Environment variable
import dotenv from "dotenv";
dotenv.config();
const mongoDB_LINK = process.env.mongoDB_LINK;
const PORT = process.env.PORT || 3001;
export const secret = process.env.secret;

// Routes
import { userRouter } from "./src/routes/userRoute.js";

// APIs
app.use("/user", userRouter);

// Database Connection
mongoose
  .connect(mongoDB_LINK)
  .then(() => {
    console.log("DB connected 🌟");

    app.listen(PORT, () => {
      console.log("OUR SERVER IS RUNNING 🚀");
    });
  })
  .catch((error) => {
    console.log("DB Connection Failed !!");
    console.log(error);
  });

// for handling API route requested not found
app.use((req, res) => {
  res.status(404).send("Route Not Found");
});
