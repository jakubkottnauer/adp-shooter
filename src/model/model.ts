import Bird from "../model/entities/bird";
import Enemy from "../model/entities/enemy";
import Entity from "../model/entities/entity";
import Subject from "../observer/subject";

export default class Model extends Subject {
  bird = new Bird(20, 20);
  enemies = new Array<Enemy>();
  worldHeight: number;
  worldWidth: number;

  constructor(width: number, height: number) {
    super();
    const enemy = new Enemy(50, 50);
    this.enemies.push(enemy);

    this.worldWidth = width;
    this.worldHeight = height;
  }

  getWorldDimensions() {
    return { width: this.worldWidth, height: this.worldHeight };
  }

  getEntities(): Array<Entity> {
    return [...this.enemies, this.bird];
  }

  moveBird(dx: number, dy: number) {
    this.bird.move(dx, dy);
  }

  update() {
    this.notifyObservers();
  }
}
