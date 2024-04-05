import express from "express";

import { matchesModel } from "../models/matches.js";
import { barModel, pieModel, histModel } from "../models/charts.js";

export const analysisRouter = express.Router();

analysisRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const match = await matchesModel.findById(id);

    const r1Data = await barModel.findById(match.charts.report_1);

    const r2Data = await barModel.findById(match.charts.report_2);

    const r3Data = await pieModel.findById(match.charts.report_3);

    const r4Data = await pieModel.findById(match.charts.report_4);

    const r6Data = await pieModel.findById(match.charts.report_6);

    const r7Data = await histModel.findById(match.charts.report_7);

    const r8Data = await barModel.findById(match.charts.report_8);

    const r9Ar = await pieModel.findById(match.charts.report_9.weapon_ar);
    const r9Sniper = await pieModel.findById(match.charts.report_9.weapon_sniper);
    const r9Data = { r9Ar, r9Sniper };

    const r10Data = await pieModel.findById(match.charts.report_10);

    res.json({ success: true, match });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});
