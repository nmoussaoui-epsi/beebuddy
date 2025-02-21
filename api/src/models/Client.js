const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    utilisateur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budgetMoyen: { type: Number, required: true },
    projets: { type: [mongoose.Schema.Types.ObjectId], ref: "Projets" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
