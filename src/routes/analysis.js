import express from "express";

import { matchesModel } from "../models/matches.js";
import { barModel, pieModel, histModel } from "../models/charts.js";

export const analysisRouter = express.Router();

analysisRouter.post("/getPlayers", async (req, res) => {
  try {
    const { id } = req.body;
    const player = await matchesModel.findById(id);
    res.json({ success: true, player});
  } catch (err) {
    res.json({ Error: err });
    console.log(err);
  }
});

analysisRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const match = await matchesModel.findById(id);

    const r1Data = await barModel.findById(match.charts.report_1);

    const r2Data = await barModel.findById(match.charts.report_2);

    const r3Data = await pieModel.findById(match.charts.report_3);

    const r4Data = await pieModel.findById(match.charts.report_4);

    // r5
    const weapon_category_ar = {};

    weapon_category_ar.weapon_ak47 = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_ak47
    );
    weapon_category_ar.weapon_aug = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_aug
    );
    weapon_category_ar.weapon_famas = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_famas
    );
    weapon_category_ar.weapon_galilar = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_galilar
    );
    weapon_category_ar.weapon_m4a1_silencer = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_m4a1_silencer
    );
    weapon_category_ar.weapon_m4a1 = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_m4a1
    );
    weapon_category_ar.weapon_sg556 = await pieModel.findById(
      match.charts.report_5.weapon_category_ar.weapon_sg556
    );

    const weapon_category_smg = {};

    weapon_category_smg.weapon_bizon = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_bizon
    );
    weapon_category_smg.weapon_mac10 = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_mac10
    );
    weapon_category_smg.weapon_mp5sd = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_mp5sd
    );
    weapon_category_smg.weapon_mp7 = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_mp7
    );
    weapon_category_smg.weapon_mp9 = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_mp9
    );
    weapon_category_smg.weapon_ump45 = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_ump45
    );
    weapon_category_smg.weapon_p90 = await pieModel.findById(
      match.charts.report_5.weapon_category_smg.weapon_p90
    );

    const weapon_category_sniper = {};

    weapon_category_sniper.weapon_awp = await pieModel.findById(
      match.charts.report_5.weapon_category_sniper.weapon_awp
    );
    weapon_category_sniper.weapon_ssg08 = await pieModel.findById(
      match.charts.report_5.weapon_category_sniper.weapon_ssg08
    );
    weapon_category_sniper.weapon_g3sg1 = await pieModel.findById(
      match.charts.report_5.weapon_category_sniper.weapon_g3sg1
    );
    weapon_category_sniper.weapon_scar20 = await pieModel.findById(
      match.charts.report_5.weapon_category_sniper.weapon_scar20
    );

    const weapon_category_lmg = {};

    weapon_category_lmg.weapon_m249 = await pieModel.findById(
      match.charts.report_5.weapon_category_lmg.weapon_m249
    );
    weapon_category_lmg.weapon_negev = await pieModel.findById(
      match.charts.report_5.weapon_category_lmg.weapon_negev
    );

    const weapon_category_pistol = {};

    weapon_category_pistol.weapon_deagle = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_deagle
    );
    weapon_category_pistol.weapon_elite = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_elite
    );
    weapon_category_pistol.weapon_fiveseven = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_fiveseven
    );
    weapon_category_pistol.weapon_glock = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_glock
    );
    weapon_category_pistol.weapon_hkp2000 = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_hkp2000
    );
    weapon_category_pistol.weapon_usp_silencer = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_usp_silencer
    );
    weapon_category_pistol.weapon_cz75a = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_cz75a
    );
    weapon_category_pistol.weapon_p250 = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_p250
    );
    weapon_category_pistol.weapon_tec9 = await pieModel.findById(
      match.charts.report_5.weapon_category_pistol.weapon_tec9
    );

    const weapon_category_shotgun = {};

    weapon_category_shotgun.weapon_mag7 = await pieModel.findById(
      match.charts.report_5.weapon_category_shotgun.weapon_mag7
    );
    weapon_category_shotgun.weapon_nova = await pieModel.findById(
      match.charts.report_5.weapon_category_shotgun.weapon_nova
    );
    weapon_category_shotgun.weapon_xm1014 = await pieModel.findById(
      match.charts.report_5.weapon_category_shotgun.weapon_xm1014
    );
    weapon_category_shotgun.weapon_sawedoff = await pieModel.findById(
      match.charts.report_5.weapon_category_shotgun.weapon_sawedoff
    );
    // r5

    const r5Data = {
      weapon_category_ar,
      weapon_category_smg,
      weapon_category_sniper,
      weapon_category_lmg,
      weapon_category_pistol,
      weapon_category_shotgun,
    };

    const r6Data = await pieModel.findById(match.charts.report_6);

    const r7Data = await histModel.findById(match.charts.report_7);

    const r8Data = await barModel.findById(match.charts.report_8);

    const r9Ar = await pieModel.findById(match.charts.report_9.weapon_ar);
    const r9Sniper = await pieModel.findById(
      match.charts.report_9.weapon_sniper
    );
    const r9Data = { r9Ar, r9Sniper };

    const r10Data = await pieModel.findById(match.charts.report_10);

    const chartsData = {
      r1Data,
      r2Data,
      r3Data,
      r4Data,
      r5Data,
      r6Data,
      r7Data,
      r8Data,
      r9Data,
      r10Data,
    };

    res.json({ success: true, chartsData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});
