import mongoose from "mongoose";

const matchesSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    charts: {
      report_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "barcharts",
        required: true,
      },
      report_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "barcharts",
        required: true,
      },
      report_3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "piecharts",
        required: true,
      },
      report_4: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "piecharts",
        required: true,
      },
      report_5: {
        weapon_category_ar: {
          weapon_ak47: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_famas: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_galilar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_m4a1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_m4a1_silencer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
        },
        weapon_category_pistol: {
          weapon_deagle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_elite: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_fiveseven: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_glock: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_p250: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_tec9: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_usp_silencer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
        },
        weapon_category_smg: {
          weapon_mac10: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
          weapon_mp9: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
        },
        weapon_category_sniper: {
          weapon_awp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
          },
        },
      },
      report_6: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "piecharts",
        required: true,
      },
      report_7: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "histograms",
        required: true,
      },
      report_8: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "barcharts",
        required: true,
      },
      report_9: {
        weapon_ar: {
          type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
        },
        weapon_sniper: {
          type: mongoose.Schema.Types.ObjectId,
            ref: "piecharts",
            required: true,
        }
      },
      report_10: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "piecharts",
        required: true,
      },
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
          required: true,
        },
        playerName: {
          type: String,
          required: true,
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