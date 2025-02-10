const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // On récupère le token dans l'en-tête Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès refusé. Veuillez vous authentifier." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Vérification du token
    req.user = decoded; // On ajoute l'objet décodé à la requête
    next(); // On passe à la création de la tâche
  } catch (error) {
    res.status(400).json({ message: "Token invalide." });
  }
};
