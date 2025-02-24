// ui.js
const addNewTaskBtn = document.querySelector(".add-task-btn");
const closeAddTaskBtn = document.querySelector(".close-add-task-btn");
const newTaskContainer = document.querySelector(".new-task-container");
const settingsBtn = document.querySelector(".settings-btn");
const settingsContainer = document.querySelector(".settings-container");
const newTaskCategoryBtn = document.querySelector(".new-task-category-btn");
const settingsCloseBtn = document.querySelector(".settings-close-button");

// Gestionnaire d'événements pour afficher/masquer le conteneur de nouvelle tâche
addNewTaskBtn.addEventListener("click", () => {
  if (newTaskContainer.style.display === "block") {
    newTaskContainer.style.display = "none";
    closeAddTaskBtn.style.display = "none";
  } else {
    newTaskContainer.style.display = "block";
    closeAddTaskBtn.style.display = "block";
    settingsContainer.style.display = "none";
  }
});

newTaskCategoryBtn.addEventListener("click", () => {
  newTaskContainer.style.display = "none";
  closeAddTaskBtn.style.display = "none";
  settingsContainer.style.display = "block";
});

// Gestionnaire d'événements pour fermer le conteneur de nouvelle tâche
closeAddTaskBtn.addEventListener("click", () => {
  newTaskContainer.style.display = "none";
  closeAddTaskBtn.style.display = "none";
});

// Fonction pour afficher une tâche
export function displayTask(task) {
  const taskList = document.querySelector(".task-list");

  // Fonction pour formater la date de manière plus lisible
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Date invalide"; // Retourne un message d'erreur si la date n'est pas valide
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  // Récupérer les catégories enregistrées
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const category = categories.find((cat) => cat.id === task.category);
  const categoryName = category ? category.name : "Catégorie inconnue";
  const categoryColor = category ? category.color : "#ccc";

  // Créer une ligne pour la nouvelle tâche
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${task.title}</td>
        <td><div  class="category-cell"></div></td>
        <td>${categoryName}</td>
        <td>${formatDate(task.createdDate)}</td>
        <td>${task.status}</td>
        <td>${task.priority}</td>
        <td>${formatDate(task.dueDate) || "Pas de date"}</td>
        <td>
            <button class="edit-task-btn">Éditer</button>
            <button class="delete-task-btn">Supprimer</button>
        </td>
    `;
  const categoryCell = row.querySelector(".category-cell");
  categoryCell.style.setProperty("--category-color", categoryColor);

  // Ajouter la ligne dans le tableau
  taskList.appendChild(row);
  row.classList.add("task-item");

  const deleteBtn = row.querySelector(".delete-task-btn");
  deleteBtn.addEventListener("click", () => deleteTask(task.id, row));

  const editBtn = row.querySelector(".edit-task-btn");
  editBtn.addEventListener("click", () => editTask(task.id));
}

// Fonction pour supprimer une tâche
function deleteTask(taskId, row) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Supprimer la ligne du tableau
  row.remove();
}

// Fonction pour éditer une tâche
function editTask(taskId) {
  // Logique pour éditer une tâche
  console.log(`Édition de la tâche avec l'ID: ${taskId}`);
}

// Gestionnaire d'événements pour afficher/masquer les paramètres
settingsBtn.addEventListener("click", () => {
  if (settingsContainer.style.display === "block") {
    settingsContainer.style.display = "none";
  } else {
    settingsContainer.style.display = "block";
    newTaskContainer.style.display = "none";
    closeAddTaskBtn.style.display = "none";
  }
});

settingsCloseBtn.addEventListener("click", () => {
  settingsContainer.style.display = "none";
});
