const express = require("express");
const { getUserMatches } = require("../controllers/matchController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserMatches);

module.exports = router;
