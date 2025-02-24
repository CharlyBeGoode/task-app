import { Task } from "./task.js";
import { displayTask } from "./ui.js";
import { Category } from "./Category.js";

// app.js
document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.querySelector(".add-new-task");
  const taskTitle = document.querySelector(".new-task-title");
  const taskDescription = document.querySelector(".new-task-description");
  const taskCategory = document.querySelector(".new-task-category");
  const taskPriority = document.querySelector(".new-task-priority");
  const taskStatus = document.querySelector(".new-task-status");
  const taskDate = document.querySelector(".new-task-date");
  const closeAddTaskBtn = document.querySelector(".close-add-task-btn");
  const newTaskContainer = document.querySelector(".new-task-container");

  addTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value;
    const description = taskDescription.value;
    const category = taskCategory.value;
    const priority = taskPriority.value;
    const status = taskStatus.value;
    const dueDate = taskDate.value;

    if (taskTitle.value.trim() === "") {
      alert("Le titre est obligatoire !");
      taskTitle.focus();
      return;
    }

    // Créer une nouvelle tâche
    const newTask = new Task(
      null, // ID généré automatiquement
      title,
      description,
      category,
      null, // Date de création automatique
      status,
      priority,
      dueDate
    );
    console.log(category);

    // Sauvegarder la tâche et l'afficher
    saveTask(newTask);
    displayTask(newTask);
    newTaskContainer.style.display = "none";
    closeAddTaskBtn.style.display = "none";
    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
  });
});

// Fonction pour sauvegarder la tâche (dans le localStorage par exemple)
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dans app.js, charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => displayTask(task));
});

// Sauvegarder les catégories dans localStorage si elles n'existent pas déjà
const savedCategories = JSON.parse(localStorage.getItem("categories"));
if (!savedCategories) {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Récupérer les catégories sauvegardées dans localStorage
let categoriesToDisplay = savedCategories || categories;

// Ajouter les catégories au selec

// Ajouter une catégorie dynamique (si souhaité)
const addCategoryButton = document.querySelector(".add-category-btn");
const newCategoryInput = document.querySelector(".new-category-input");

// Récupérer l'élément <ul> des paramètres
const categoryList = document.querySelector(".category-list");

// Ajouter les catégories sauvegardées dans localStorage à la fois dans le <select> et le <ul> des paramètres
categoriesToDisplay.forEach((category) => {
  // Ajouter dans le <select>
  const categorySelect = document.querySelector(".new-task-category");
  const option = document.createElement("option");
  option.value = category.id;
  option.textContent = category.name;
  option.style.backgroundColor = category.color;
  categorySelect.appendChild(option);

  // Ajouter dans le <ul class="category-list"> dans les paramètres
  const li = document.createElement("li");
  li.textContent = category.name;
  li.style.backgroundColor = category.color; // Applique la couleur de fond de la catégorie
  categoryList.appendChild(li);

  // Ajouter un bouton pour supprimer la catégorie
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.classList.add("delete-category-btn");
  deleteBtn.addEventListener("click", () => {
    categoriesToDisplay = categoriesToDisplay.filter(
      (c) => c.id !== category.id
    );
    localStorage.setItem("categories", JSON.stringify(categoriesToDisplay));
    li.remove();
    option.remove();
  });
  li.appendChild(deleteBtn);
});
// Ajouter une catégorie dynamique au <ul> des paramètres et au <select>
addCategoryButton.addEventListener("click", () => {
  const name = newCategoryInput.value.trim();
  if (!name) {
    alert("Le nom de la catégorie est requis");
    return;
  }

  const color = document.querySelector(".new-category-color").value;

  if (color && name) {
    const newCategory = new Category(crypto.randomUUID(), name, color);

    // Ajouter la nouvelle catégorie au tableau des catégories
    categoriesToDisplay.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(categoriesToDisplay));

    // Ajouter la nouvelle catégorie dans le <select> pour les tâches
    const categorySelect = document.querySelector(".new-task-category");
    const option = document.createElement("option");
    option.value = newCategory.id;
    option.textContent = newCategory.name;
    option.style.backgroundColor = newCategory.color;
    categorySelect.appendChild(option);

    // Ajouter la nouvelle catégorie dans le <ul class="category-list"> des paramètres
    const li = document.createElement("li");
    li.textContent = newCategory.name;
    li.style.backgroundColor = newCategory.color; // Applique la couleur de fond
    categoryList.appendChild(li);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-category-btn");
    deleteBtn.addEventListener("click", () => {
      categoriesToDisplay = categoriesToDisplay.filter(
        (c) => c.id !== category.id
      );
      localStorage.setItem("categories", JSON.stringify(categoriesToDisplay));
      li.remove();
      option.remove();
    });
    li.appendChild(deleteBtn);

    // Réinitialiser le champ de saisie
    newCategoryInput.value = "";
  }
});
