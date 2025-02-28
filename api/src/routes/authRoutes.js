const express = require("express");
const {
  registerUser,
  completeProfile,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth API is running" });
});
router.post("/register", registerUser);
router.post("/complete-profile", protect, completeProfile);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
