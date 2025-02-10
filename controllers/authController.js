const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Assure-toi d'avoir le modèle User

// 🔹 Inscription d'un utilisateur
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10); // Générer le sel
    const hashedPassword = await bcrypt.hash(password, salt); // Hacher le mot de passe avec le sel

    // Créer l'utilisateur
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Générer un token JWT (utilisation de _id pour être cohérent)
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Inscription réussie", token });
  } catch (error) {
    console.error(error); // Pour afficher les erreurs dans la console
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    // Générer un token JWT (le payload contiendra _id)
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error(error); // Pour afficher les erreurs dans la console
    res.status(500).json({ message: "Erreur serveur" });
  }
};
