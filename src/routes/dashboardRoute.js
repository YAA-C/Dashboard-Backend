import express from "express";

import { matchesModel } from "../models/matches.js";

export const dashboardRouter = express.Router();

dashboardRouter.post("/getMatches", async (req, res) => {
  try {
    const { id } = req.body;

    // const found = await matchesModel.find({ account_id: id });
    const found = await matchesModel
      .find({ account_id: id })
      .sort({ createdAt: -1 });

    if (found.length !== 0) {
      res.json({ success: true, found });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.json({ Error: err });
    console.log(err);
  }
});

dashboardRouter.get("/getPlayers", async (req, res) => {
  try {
    const { id } = req.body;

    const found = await matchesModel.find({ account_id: id });

    if (found.length !== 0) {
      res.json({ success: true, found });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.json({ Error: err });
    console.log(err);
  }
});
