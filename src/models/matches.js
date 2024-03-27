import mongoose from "mongoose";

const pieSchema = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "piecharts",
  default: null,
};

const barSchema = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "barcharts",
  default: null,
};

const histSchema = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "histograms",
  default: null,
};

const matchesSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    charts: {
      report_1: barSchema,
      report_2: barSchema,
      report_3: pieSchema,
      report_4: pieSchema,
      report_5: {
        weapon_category_ar: {
          weapon_ak47: pieSchema,
          weapon_aug: pieSchema,
          weapon_famas: pieSchema,
          weapon_galilar: pieSchema,
          weapon_m4a1_silencer: pieSchema,
          weapon_m4a1: pieSchema,
          weapon_sg556: pieSchema,
        },
        weapon_category_smg: {
          weapon_bizon: pieSchema,
          weapon_mac10: pieSchema,
          weapon_mp5sd: pieSchema,
          weapon_mp7: pieSchema,
          weapon_mp9: pieSchema,
          weapon_ump45: pieSchema,
          weapon_p90: pieSchema,
        },
        weapon_category_sniper: {
          weapon_awp: pieSchema,
          weapon_ssg08: pieSchema,
          weapon_g3sg1: pieSchema,
          weapon_scar20: pieSchema,
        },
        weapon_category_lmg: {
          weapon_m249: pieSchema,
          weapon_negev: pieSchema,
        },
        weapon_category_pistol: {
          weapon_deagle: pieSchema,
          weapon_elite: pieSchema,
          weapon_fiveseven: pieSchema,
          weapon_glock: pieSchema,
          weapon_hkp2000: pieSchema,
          weapon_usp_silencer: pieSchema,
          weapon_cz75a: pieSchema,
          weapon_p250: pieSchema,
          weapon_tec9: pieSchema,
        },
        weapon_category_shotgun: {
          weapon_mag7: pieSchema,
          weapon_nova: pieSchema,
          weapon_xm1014: pieSchema,
          weapon_sawedoff: pieSchema,
        },
      },
      report_6: pieSchema,
      report_7: histSchema,
      report_8: barSchema,
      report_9: {
        weapon_ar: pieSchema,
        weapon_sniper: pieSchema,
      },
      report_10: pieSchema,
    },
    is_Analyzed: {
      type: Boolean,
      default: false,
    },
    tebi_Link: {
      type: String,
      required: true,
    },
    players: [
      {
        steamid: {
          type: String,
        },
        playerName: {
          type: String,
        },
        isCheating: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const matchesModel = mongoose.model("matches", matchesSchema);