// Sélection des éléments
const newTaskContainer = document.querySelector(".new-task-container");
const newTaskButton = document.querySelector(".new-task-button");
const closeNewTask = document.querySelector(".close-new-task");
const addTaskButton = document.querySelector(".add-task");
const taskList = document.querySelector(".tasklist");
const taskTitleInput = document.querySelector(".new-title");
const taskDescriptionInput = document.querySelector(".new-description");
const allButton = document.querySelector(".all");
const activeButton = document.querySelector(".active");
const settingsButton = document.querySelector(".settings-button");
const settingsContainer = document.querySelector(".settings-container");

let currentTask = null; // Stockera la tâche en cours de modification
let currentCategory = null;

// Masquer le formulaire au départ
newTaskContainer.style.display = "none";

// Fonction pour fermer tous les conteneurs
function closeAllContainers() {
  newTaskContainer.style.display = "none"; // Ferme le conteneur de la nouvelle tâche
  settingsContainer.style.display = "none"; // Ferme le conteneur des paramètres
  categoryListContainer.style.display = "none"; // Ferme le conteneur des catégories
}

// Affichage du formulaire d'ajout
newTaskButton.addEventListener("click", () => {
  closeAllContainers(); // Ferme tous les conteneurs avant d'ouvrir celui-ci
  newTaskContainer.style.display = "block"; // Affiche le conteneur de la nouvelle tâche
  addTaskButton.textContent = "Ajouter"; // Remettre le bouton à "Ajouter"
  currentTask = null; // Aucune tâche en cours de modification
});

// Fermeture du formulaire
closeNewTask.addEventListener("click", () => {
  newTaskContainer.style.display = "none";
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  currentTask = null;
  addTaskButton.textContent = "Ajouter";
});

// Ajout de la classe Task
class Task {
  constructor(title, description, category) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = "in-progress"; // Statut par défaut
  }

  createTaskElement() {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("data-status", this.status);

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskItem.appendChild(taskInfo);

    // Élément titre et description
    const taskTextTitle = document.createElement("span");
    taskTextTitle.textContent = this.title;
    taskTextTitle.classList.add("task-title");

    const taskTextDescription = document.createElement("span");
    taskTextDescription.textContent = this.description;
    taskTextDescription.classList.add("task-description");

    taskInfo.appendChild(taskTextTitle);
    taskInfo.appendChild(taskTextDescription);

    // Afficher la catégorie
    const taskCategory = document.createElement("span");
    taskCategory.classList.add("task-category");
    taskCategory.textContent = this.category;

    taskInfo.appendChild(taskCategory);

    // Conteneur des boutons
    const buttonList = document.createElement("div");
    buttonList.classList.add("buttonList");
    taskItem.appendChild(buttonList);

    // Checkbox pour marquer comme complété
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    taskInfo.prepend(checkbox);

    // Bouton Modifier
    const modifyButton = document.createElement("button");
    modifyButton.textContent = "✏️";
    taskInfo.appendChild(modifyButton);

    // Bouton Supprimer
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    taskInfo.appendChild(deleteButton);

    // Ajout de la tâche dans la liste
    taskList.prepend(taskItem);

    // Modifier une tâche (réouverture du formulaire)
    modifyButton.addEventListener("click", () => {
      taskTitleInput.value = taskTextTitle.textContent;
      taskDescriptionInput.value = taskTextDescription.textContent;
      newTaskContainer.style.display = "block";
      addTaskButton.textContent = "Modifier";
      currentTask = taskItem; // Stocker la tâche en cours de modification
    });

    // Supprimer une tâche
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(taskItem);
    });

    // Marquer comme complété
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskItem.setAttribute("data-status", "completed");
        taskItem.classList.toggle("complete");
      } else {
        taskItem.setAttribute("data-status", "in-progress");
        taskItem.classList.toggle("complete");
      }
    });

    return taskItem;
  }
}

// Fonction pour ajouter une tâche
function addTask() {
  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const category = categorySelect.value;

  if (title === "" || description === "") return; // Empêcher l'ajout si vide

  if (currentTask) {
    // Mode modification
    const titleElement = currentTask.querySelector(".task-title");
    const descriptionElement = currentTask.querySelector(".task-description");

    titleElement.textContent = title;
    descriptionElement.textContent = description;

    currentTask = null;
    addTaskButton.textContent = "Ajouter"; // Revenir au mode ajout
  } else {
    // Mode ajout
    const newTask = new Task(title, description, category);
    const taskElement = newTask.createTaskElement();
    taskList.prepend(taskElement);
  }

  // Réinitialiser le formulaire et fermer
  taskTitleInput.value = "";
  taskDescriptionInput.value = "";
  categorySelect.value = "work"; // Remettre la catégorie par défaut
  newTaskContainer.style.display = "none";
}

// Ajouter une tâche avec le bouton
addTaskButton.addEventListener("click", addTask);

// Ajouter une tâche avec "Enter" (uniquement si le formulaire est ouvert)
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && newTaskContainer.style.display === "block") {
    event.preventDefault(); // Empêcher le saut de ligne dans le textarea
    addTask();
  }
});

// Filtrage des tâches par statut
const tasks = document.querySelectorAll(".task-item");

const inProgressTasks = Array.from(tasks).filter(
  (task) => task.getAttribute("data-status") === "in-progress"
);
const completedTasks = Array.from(tasks).filter(
  (task) => task.getAttribute("data-status") === "completed"
);

// Onglet "Toutes"
const allTab = document.querySelector(".all-tab");

// Onglet "En cours"
const inProgressTab = document.querySelector(".in-progress-tab");

// Onglet "Terminées"
const completedTab = document.querySelector(".completed-tab");

allTab.addEventListener("click", () => {
  showAllTasks();
});

inProgressTab.addEventListener("click", () => {
  showInProgressTasks();
});

completedTab.addEventListener("click", () => {
  showCompletedTasks();
});

// Fonction pour afficher toutes les tâches
function showAllTasks() {
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => (task.style.display = "block"));
}

// Fonction pour afficher uniquement les tâches en cours
function showInProgressTasks() {
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => {
    if (task.getAttribute("data-status") === "in-progress") {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Fonction pour afficher uniquement les tâches terminées
function showCompletedTasks() {
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => {
    if (task.getAttribute("data-status") === "completed") {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// CATEGORIES

// Sélection des éléments
const addCategoryButton = document.querySelector(".add-category-button");
const newCategoryInput = document.querySelector(".new-category-input");
const categorySelect = document.querySelector(".new-category");
const modifyCategoryButton = document.querySelector(".modify-category-button");
const categoryListContainer = document.querySelector(".category-list");
const categoryUl = document.querySelector(".category-ul");
categoryListContainer.style.display = "none";

// Charger la liste des catégories à supprimer
function loadCategoryList() {
  categoryUl.innerHTML = ""; // Réinitialiser la liste
  const categories = Array.from(categorySelect.options);

  categories.forEach((option) => {
    if (option.value !== "") {
      const li = document.createElement("li");
      li.classList.add("category-item");
      li.textContent = option.value;

      const modifyButton = document.createElement("button");
      modifyButton.textContent = "✏️";
      li.appendChild(modifyButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "🗑️";
      li.appendChild(deleteButton);

      // Créer un nouvel input et un bouton pour modifier la catégorie
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.placeholder = "Nouvelle catégorie";
      editInput.style.display = "none"; // Cacher par défaut

      const saveButton = document.createElement("button");
      saveButton.textContent = "Sauvegarder";
      saveButton.style.display = "none"; // Cacher par défaut

      li.appendChild(editInput);
      li.appendChild(saveButton);

      modifyButton.addEventListener("click", () => {
        // Afficher l'input et le bouton de sauvegarde
        editInput.value = option.value; // Remplir l'input avec la valeur actuelle
        editInput.style.display = "inline"; // Afficher l'input
        saveButton.style.display = "inline"; // Afficher le bouton de sauvegarde
      });

      saveButton.addEventListener("click", () => {
        const newCategoryValue = editInput.value.trim();
        newCategoryValue.classList.add("task-category");
        if (newCategoryValue) {
          option.value = newCategoryValue; // Modifier la valeur de l'option
          option.textContent = newCategoryValue; // Modifier le texte de l'option
          editInput.style.display = "none"; // Cacher l'input
          saveButton.style.display = "none"; // Cacher le bouton de sauvegarde
        }
      });

      deleteButton.addEventListener("click", () => {
        categorySelect.removeChild(option);
        loadCategoryList(); // Recharger la liste des catégories
      });

      categoryUl.appendChild(li);
    }
  });
}

// Afficher ou cacher l'input pour ajouter une nouvelle catégorie
addCategoryButton.addEventListener("click", () => {
  const newCategory = newCategoryInput.value.trim();
  if (newCategory) {
    // Ajouter la nouvelle catégorie
    const newOption = document.createElement("option");
    newOption.value = newCategory;
    newOption.textContent = newCategory;
    categorySelect.appendChild(newOption);
    loadCategoryList(); // Rafraîchir la liste des catégories après ajout
    newCategoryInput.value = ""; // Réinitialiser l'input
  }
});

// Afficher ou cacher la liste des catégories à supprimer
modifyCategoryButton.addEventListener("click", () => {
  closeAllContainers(); // Ferme tous les conteneurs avant d'ouvrir celui-ci
  if (categoryListContainer && categoryListContainer.style) {
    if (
      categoryListContainer.style.display === "none" ||
      categoryListContainer.style.display === ""
    ) {
      categoryListContainer.style.display = "block"; // Affiche le conteneur des catégories
      loadCategoryList(); // Charger la liste des catégories
    } else {
      categoryListContainer.style.display = "none"; // Cache le conteneur
      modifyCategoryButton.textContent = "Modifier catégories";
    }
  } else {
    console.error("categoryListContainer n'existe pas.");
  }
});

// Affichage du conteneur des paramètres
settingsButton.addEventListener("click", () => {
  closeAllContainers(); // Ferme tous les conteneurs avant d'ouvrir celui-ci
  // Vérifie si le conteneur est déjà affiché
  if (
    settingsContainer.style.display === "none" ||
    settingsContainer.style.display === ""
  ) {
    settingsContainer.style.display = "block"; // Affiche le conteneur
  } else {
    settingsContainer.style.display = "none"; // Cache le conteneur
  }
});

const closeCategories = document.querySelector(".close-categories");

closeCategories.addEventListener("click", () => {
  categoryListContainer.style.display = "none";
});

const closeSettings = document.querySelector(".close-settings");

closeSettings.addEventListener("click", () => {
  settingsContainer.style.display = "none";
});
