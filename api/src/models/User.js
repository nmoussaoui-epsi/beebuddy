const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    adresse: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, required: true },
    role: { type: String, enum: ["client", "freelance"], required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.motDePasse);
};

module.exports = mongoose.model("User", UserSchema);
