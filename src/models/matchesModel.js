import mongoose from "mongoose";

const matchesSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    charts: {
      No_1: {
        labels: {
          type: [String],
          required: true,
        },
        data: {
          type: [Number],
          required: true,
        },
      },
      No_2: {
        labels: {
          type: [String],
          required: true,
        },
        data: {
          type: [Number],
          required: true,
        },
      },
      No_3: {
        labels: {
          type: [String],
          required: true,
        },
        data: {
          type: [Number],
          required: true,
        },
      },
      No_5: {
        weapon_category_ar: {
          weapon_ak47: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_famas: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_galilar: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_m4a1: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_m4a1_silencer: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
        },
        weapon_category_pistol: {
          weapon_deagle: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_elite: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_fiveseven: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_glock: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_p250: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_tec9: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_usp_silencer: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
        },
        weapon_category_smg: {
          weapon_mac10: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
          weapon_mp9: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
        },
        weapon_category_sniper: {
          weapon_awp: {
            labels: {
              type: [String],
              required: true,
            },
            data: {
              type: [Number],
              required: true,
            },
          },
        },
      },
      No_6: {
        labels: {
          type: [String],
          required: true,
        },
        data: {
          type: [Number],
          required: true,
        },
      },
      No_7: {
        histData: {
          type: [Number],
          required: true,
        },
        edges: {
          type: [Number],
          required: true,
        },
      },
      No_8: {
        labels: {
          type: [String],
          required: true,
        },
        data: {
          type: [Number],
          required: true,
        },
      },
      No_9: {
        sniper: {
          labels: {
            type: [String],
            required: true,
          },
          data: {
            type: [Number],
            required: true,
          },
        },
        scopingAR: {
          labels: {
            type: [String],
            required: true,
          },
          data: {
            type: [Number],
            required: true,
          },
        },
      },
      No_10: {
        labels: {
          type: [String],
          required: true,
        },
        data: {
          type: [Number],
          required: true,
        },
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
        _id: {
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
