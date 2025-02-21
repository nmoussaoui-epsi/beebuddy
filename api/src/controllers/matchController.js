const Match = require("../models/Match");

exports.getUserMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ utilisateur1: req.user._id }, { utilisateur2: req.user._id }],
    }).populate("utilisateur1 utilisateur2", "nom prenom role");

    res.status(200).json(matches);
  } catch (error) {
    console.error("ERREUR GET MATCHES :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};
