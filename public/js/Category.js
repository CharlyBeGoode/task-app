export class Category {
  constructor(id, name, color) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.color = color;
  }
}
