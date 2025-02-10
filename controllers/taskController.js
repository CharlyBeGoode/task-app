const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.user._id; // On récupère l'ID de l'utilisateur depuis la requête

    const newTask = new Task({
      title,
      description,
      category,
      userId, // On associe la tâche à l'utilisateur
    });

    await newTask.save(); // Sauvegarder la tâche dans la base de données

    res.status(201).json({ message: "Tâche créée avec succès", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
