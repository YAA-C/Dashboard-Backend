import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connector from "./connector.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

// Environment variable
import dotenv from "dotenv";
dotenv.config();
const mongoDB_LINK = process.env.mongoDB_LINK;
const PORT = process.env.PORT || 3001;
export const secret = process.env.secret;

// Routes
import { userRouter } from "./src/routes/userRoute.js";
import { mongoCsvRouter } from "./src/routes/mongoCsvRoute.js";
import { tebiRouter } from "./src/routes/tebiCsvRoute.js";
import { dashboardRouter } from "./src/routes/dashboardRoute.js";
import { matchesRouter } from "./src/routes/matchesRoute.js";
import { analysisRouter } from "./src/routes/analysis.js";
import { fightRouter } from "./src/routes/figthsRoute.js";

// APIs
app.use("/user", userRouter);
app.use("/mongoCsv", mongoCsvRouter);
app.use("/tebi", tebiRouter);
app.use("/dashboard", dashboardRouter);
app.use("/matches", matchesRouter);
app.use("/analysis", analysisRouter);
app.use("/fights", fightRouter);

// Database Connection
mongoose
  .connect(mongoDB_LINK)
  .then(() => {
    console.log("DB connected 🌟");

    connector
      .connectRabbit()
      .then(() => {
        console.log("Connected to RabbitMQ 🔥");

        app.listen(PORT, () => {
          console.log("OUR SERVER IS RUNNING 🚀");
          console.log(`http://localhost:${PORT}`);
        });
      })
      .catch((error) => {
        console.log("RabbitMQ Connection Failed !!");
        console.log(error);
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
