const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "BeeBuddy API is running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/swipes", require("./routes/swipeRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  });
});
