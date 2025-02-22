const Swipe = require("../models/Swipe");
const Match = require("../models/Match");
const User = require("../models/User");

exports.swipeUser = async (req, res) => {
  const { cible_id, action } = req.body;

  try {
    const cible = await User.findById(cible_id);
    if (!cible)
      return res
        .status(404)
        .json({ message: "Utilisateur cible introuvable." });

    if (req.user.role === cible.role) {
      return res.status(400).json({
        message: "Vous ne pouvez swiper que des utilisateurs de rôle opposé.",
      });
    }

    const existingSwipe = await Swipe.findOne({
      utilisateur_id: req.user._id,
      cible_id,
    });
    if (existingSwipe)
      return res
        .status(400)
        .json({ message: "Vous avez déjà swipé cette personne." });

    const swipe = new Swipe({ utilisateur_id: req.user._id, cible_id, action });
    await swipe.save();

    if (action === "like") {
      const mutualSwipe = await Swipe.findOne({
        utilisateur_id: cible_id,
        cible_id: req.user._id,
        action: "like",
      });

      if (mutualSwipe) {
        const match = new Match({
          utilisateur1: req.user._id,
          utilisateur2: cible_id,
        });
        await match.save();

        await Notification.create({
          utilisateur_id: req.user._id,
          type: "match",
          message: "Vous avez un nouveau match avec " + cible.nom,
        });

        await Notification.create({
          utilisateur_id: cible_id,
          type: "match",
          message: "Vous avez un nouveau match avec " + req.user.nom,
        });

        return res.status(201).json({ message: "Match trouvé !", match });
      }
    }

    res.status(201).json({ message: "Swipe enregistré avec succès." });
  } catch (error) {
    console.error("🔥 ERREUR SWIPE :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};
