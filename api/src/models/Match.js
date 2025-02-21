const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  utilisateur1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  utilisateur2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Match", MatchSchema);
