const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      utilisateur_id: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("ERREUR GET NOTIFICATIONS :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification introuvable." });

    if (notification.utilisateur_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Accès refusé." });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marquée comme lue." });
  } catch (error) {
    console.error("🔥 ERREUR MARK AS READ :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};
