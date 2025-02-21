const User = require("../models/User");
const Freelance = require("../models/Freelance");
const Client = require("../models/Client");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    motDePasse,
    dateDeNaissance,
    adresse,
    ville,
    codePostal,
    role,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Cet email est déjà utilisé." });

    user = new User({
      nom,
      prenom,
      email,
      motDePasse,
      dateDeNaissance,
      adresse,
      ville,
      codePostal,
      role,
    });
    await user.save();

    res.status(201).json({
      _id: user._id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("ERREUR INSCRIPTION :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};

exports.completeProfile = async (req, res) => {
  const { role, competences, tarification, experience, budgetMoyen } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable." });

    if (role === "freelance") {
      const freelance = new Freelance({
        utilisateur_id: req.user._id,
        competences,
        tarification,
        experience,
      });
      await freelance.save();
      return res
        .status(201)
        .json({ message: "Profil freelance complété avec succès", freelance });
    }

    if (role === "client") {
      const client = new Client({
        utilisateur_id: req.user._id,
        budgetMoyen,
      });
      await client.save();
      return res
        .status(201)
        .json({ message: "Profil client complété avec succès", client });
    }

    res.status(400).json({ message: "Rôle invalide" });
  } catch (error) {
    console.error("🔥 ERREUR MISE À JOUR PROFIL :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    res.status(200).json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("ERREUR CONNEXION :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-motDePasse");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    let profile;
    if (user.role === "freelance") {
      profile = await Freelance.findOne({ utilisateur_id: user._id });
    } else if (user.role === "client") {
      profile = await Client.findOne({ utilisateur_id: user._id });
    }

    res.status(200).json({ user, profile });
  } catch (error) {
    console.error("ERREUR GET PROFILE :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      dateDeNaissance,
      adresse,
      ville,
      codePostal,
      role,
      competences,
      tarification,
      experience,
      budgetMoyen,
    } = req.body;

    let user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (email) user.email = email;
    if (dateDeNaissance) user.dateDeNaissance = dateDeNaissance;
    if (adresse) user.adresse = adresse;
    if (ville) user.ville = ville;
    if (codePostal) user.codePostal = codePostal;

    await user.save();

    let profile;
    if (user.role === "freelance") {
      profile = await Freelance.findOneAndUpdate(
        { utilisateur_id: req.user._id },
        { competences, tarification, experience },
        { new: true }
      );
    } else if (user.role === "client") {
      profile = await Client.findOneAndUpdate(
        { utilisateur_id: req.user._id },
        { budgetMoyen },
        { new: true }
      );
    }

    res
      .status(200)
      .json({ message: "Profil mis à jour avec succès", user, profile });
  } catch (error) {
    console.error("ERREUR UPDATE PROFILE :", error);
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", erreur: error.message });
  }
};
