import express from "express";

import { fightModel } from "../models/fight.js";

export const fightRouter = express.Router();

fightRouter.get("/:id/:num", async (req, res) => {
  try {
    const matchId = req.params.id;
    const num = req.params.num-1;
    const match = await fightModel.find({ match_id: matchId });
    const extractedData = match.map(item => item.data);
    res.send({fights:extractedData[num],totalFights:extractedData.length});
  } catch (err) {
    console.log(err);
    res.json(err.message)
  }
});
