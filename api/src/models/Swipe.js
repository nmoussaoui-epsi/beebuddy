const mongoose = require("mongoose");

const SwipeSchema = new mongoose.Schema({
  utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cible_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: { type: String, enum: ["like", "dislike"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Swipe", SwipeSchema);
