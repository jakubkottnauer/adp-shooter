import Bird from "../model/entities/bird";
import Enemy from "../model/entities/enemy";
import Entity from "../model/entities/entity";
import Subject from "../observer/subject";
import Missile from "../model/entities/missile";
import Explosion from "../model/entities/explosion";
import State from '../states';

export default class Model extends Subject {
  bird = new Bird(20, 20);
  enemies = new Array<Enemy>();
  missile: Missile;
  explosions = new Array<Explosion>();
  worldHeight: number;
  worldWidth: number;
  state = State.Playing;

  constructor(width: number, height: number) {
    super();
    this.worldWidth = width;
    this.worldHeight = height;

    this.generateEnemies(2, 4);
  }

  generateEnemies(min: number, max: number) {
    const enemyCount = this.randomBetween(min, max);
    for (let i = 0; i < enemyCount; i++) {
      const enemy = new Enemy(
        this.randomBetween(100 + i * 70, this.worldWidth - 100),
        this.randomBetween(5, this.worldHeight - 50)
      );
      console.log(enemy.getPosition());
      this.enemies.push(enemy);
    }
  }

  getWorldDimensions() {
    return { width: this.worldWidth, height: this.worldHeight };
  }

  getEntities(): Array<Entity> {
    if (this.missile != null) {
      return [...this.enemies, ...this.explosions, this.bird, this.missile];
    }
    return [...this.enemies, ...this.explosions, this.bird];
  }

  getState() {
    return this.state;
  }

  private randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private moveBird(dx: number, dy: number) {
    if (!this.bird.isWithinWorld(this.worldWidth, this.worldHeight, dx, dy)) {
      return;
    }
    this.bird.move(dx, dy);
  }

  moveBirdDown() {
    this.moveBird(0, 5);
  }

  moveBirdUp() {
    this.moveBird(0, -5);
  }

  moveMissile() {
    if (!this.missile.isWithinWorld(this.worldWidth, this.worldHeight)) {
      this.missile = null;
      return;
    }
    this.missile.move(8, 0);
  }

  createMissile() {
    if (this.missile) {
      return;
    }
    const { x, y } = this.bird.getPosition();
    this.missile = new Missile(x, y);
  }

  update() {
    if (this.missile != null) {
      for(let i = 0; i < this.enemies.length; i++) {
        if (this.missile.collidesWith(this.enemies[i])) {
          this.enemies.splice(i, 1);
          const missPos = this.missile.getPosition();
          const exp = new Explosion(missPos.x, missPos.y);
          this.explosions.push(exp);

          setTimeout(() => {
            this.explosions = new Array<Explosion>();
          }, 500)
          this.missile = null;
          return;
        }
      }
    }

    if (this.missile != null) {
      this.moveMissile();
    }

    if (this.enemies.length === 0) {
      this.state = State.Victory;
    }
    this.notifyObservers();
  }
}
