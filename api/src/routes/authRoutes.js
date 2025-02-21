const express = require("express");
const {
  registerUser,
  completeProfile,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/complete-profile", protect, completeProfile);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
