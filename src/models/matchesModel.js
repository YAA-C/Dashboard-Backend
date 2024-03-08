import mongoose from "mongoose";

const matchesSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    charts: {
      Q1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bars",
        required: true,
      },
      Q2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bars",
        required: true,
      },
      Q3_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pies",
        required: true,
      },
      Q4_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bars",
        required: true,
      },
      No_5: {
        weapon_category_ar: {
          weapon_ak47_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_famas_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_galilar_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_m4a1_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_m4a1_silencer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
        },
        weapon_category_pistol: {
          weapon_deagle_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_elite_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_fiveseven_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_glock_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_p250_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_tec9_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_usp_silencer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
        },
        weapon_category_smg: {
          weapon_mac10_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
          weapon_mp9_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
        },
        weapon_category_sniper: {
          weapon_awp_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pies",
            required: true,
          },
        },
      },
      Q6_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bars",
        required: true,
      },
      Q7_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hists",
        required: true,
      },
      Q8_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bars",
        required: true,
      },
      Q9_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nines",
        required: true,
      },
      Q10_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bars",
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