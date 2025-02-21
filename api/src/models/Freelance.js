const mongoose = require("mongoose");

const FreelanceSchema = new mongoose.Schema(
  {
    utilisateur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    competences: { type: [String], required: true },
    tarification: { type: Number, required: true },
    experience: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Freelance", FreelanceSchema);
