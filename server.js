require("dotenv").config(); // Charger les variables d'environnement
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Routes d'authentification
app.use("/api/auth", authRoutes);

// Connexion à la base de données MongoDB avec une variable d'environnement
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskApp";
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Route par défaut pour tester si le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'application de gestion de tâches !");
});

// Routes d'inscription et de connexion
const User = require("./models/User");

// Route d'inscription
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route de connexion
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = user.generateAuthToken();
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Utilisation des routes de tâches
app.use("/api/tasks", taskRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Définir le port et démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
