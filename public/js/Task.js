export class Task {
  constructor(
    id,
    title,
    description,
    category,
    createdDate,
    status,
    priority,
    dueDate,
    subTasks = [],
    comments = []
  ) {
    this.id = id || crypto.randomUUID(); // Génère un ID unique si non fourni
    this.title = title;
    this.description = description;
    this.category = category;
    this.createdDate = new Date().toISOString();
    this.status = status || "notStarted";
    this.priority = priority || "medium";
    this.dueDate = dueDate || null;
    this.subTasks = subTasks;
    this.comments = comments;
  }
}
