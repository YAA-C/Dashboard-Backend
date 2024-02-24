import mongoose from "mongoose";

const fightSchema = new mongoose.Schema(
  {
    match_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "matches",
      required: true,
    },
    playerSteamId: {
      type: String,
      required: true,
    },
    targetSteamId: {
      type: String,
      required: true,
    },
    playerName: { type: String, required: true },
    targetName: { type: String, required: true },
    data: [
      {
        playerX: { type: Number, required: true },
        playerY: { type: Number, required: true },
        targetX: { type: Number, required: true },
        targetY: { type: Number, required: true },
        isHurt: { type: Boolean, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const fightModel = mongoose.model("fights", fightSchema);
