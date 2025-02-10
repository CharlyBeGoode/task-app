const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware"); // Importation du middleware d'authentification

// Route pour créer une tâche
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const task = new Task({
      title,
      description,
      category,
      userId: req.user._id, // L'ID de l'utilisateur est récupéré via le token dans req.user
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route pour récupérer les tâches de l'utilisateur
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }); // Récupérer les tâches associées à l'utilisateur
    res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route pour mettre à jour une tâche (ex: marquer comme complétée)
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Vérifie que l'utilisateur est bien associé à cette tâche
      req.body,
      { new: true } // Retourne la tâche mise à jour
    );
    res.send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route pour supprimer une tâche
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findOneAndDelete({ _id: id, userId: req.user._id }); // Supprime la tâche associée à l'utilisateur
    res.send("Tâche supprimée");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
