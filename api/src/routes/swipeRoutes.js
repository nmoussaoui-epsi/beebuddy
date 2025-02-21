const express = require("express");
const { swipeUser } = require("../controllers/swipeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, swipeUser);

module.exports = router;
