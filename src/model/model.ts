import Bird from "../model/entities/bird/bird";
import Enemy from "../model/entities/enemy";
import Entity from "../model/entities/entity";
import Subject from "../observer/subject";
import Missile from "../model/entities/missile";
import Explosion from "../model/entities/explosion";
import State from "../gameStates";
import SimpleFactory from "../factory/simpleFactory";
import RealisticFactory from "../factory/realisticFactory";
import AbstractFactory from "../factory/abstractFactory";

enum Mode {
  Simple,
  Realistic
}

const GAME_MODE: Mode = Mode.Simple;

export default class Model extends Subject {
  private bird: Bird;
  private enemies = new Array<Enemy>();
  private missiles = new Array<Missile>();
  private explosions = new Array<Explosion>();
  private worldDimensions: [number, number];
  private state = State.Playing;
  private score = 0;
  private factory: AbstractFactory;

  constructor(width: number, height: number) {
    super();
    this.worldDimensions = [width, height];
    this.factory =
      GAME_MODE == Mode.Simple ? new SimpleFactory() : new RealisticFactory();
    this.bird = new Bird(20, height / 2, this.factory);
    this.generateEnemies(2, 5);
  }

  generateEnemies(min: number, max: number) {
    const enemyCount = this.randomBetween(min, max);
    const [width, height] = this.worldDimensions;
    for (let i = 0; i < enemyCount; i++) {
      const enemy = this.factory.createEnemy(
        this.randomBetween(100 + i * 70, width - 100),
        this.randomBetween(5, height - 50)
      );
      this.enemies.push(enemy);
    }
  }

  getWorldDimensions() {
    return this.worldDimensions;
  }

  getEntities(): Array<Entity> {
    return [...this.enemies, ...this.explosions, this.bird, ...this.missiles];
  }

  getState() {
    return this.state;
  }

  getScore() {
    return this.score;
  }

  private randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private moveBird(dx: number, dy: number) {
    const [width, height] = this.worldDimensions;
    if (!this.bird.isWithinWorld(width, height, dx, dy)) {
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

  moveMissile(idx: number) {
    const [width, height] = this.worldDimensions;
    if (!this.missiles[idx].isWithinWorld(width, height)) {
      this.missiles.splice(idx, 1);
      return;
    }
    this.missiles[idx].move(6, 0);
  }

  birdFire() {
    if (this.missiles.length === 3) {
      return;
    }
    const newMissiles = this.bird.fire();
    this.missiles = [...this.missiles, ...newMissiles];
  }

  toggleBirdState() {
    this.bird.toggleState();
  }

  get birdState() {
    return this.bird.state;
  }

  get realismState() {
    return GAME_MODE === Mode.Realistic;
  }

  update() {
    for (let j = this.missiles.length - 1; j >= 0; j--) {
      this.moveMissile(j);
    }

    for (let j = this.missiles.length - 1; j >= 0; j--) {
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        if (this.missiles[j].collidesWith(this.enemies[i])) {
          const [missX, missY] = this.missiles[j].position;
          const exp = new Explosion(missX, missY);
          this.explosions.push(exp);
          this.score++;
          setTimeout(() => {
            this.explosions = new Array<Explosion>();
          }, 500);
          this.enemies.splice(i, 1);
          this.missiles.splice(j, 1);
          return;
        }
      }
    }

    if (this.enemies.length === 0) {
      this.state = State.Victory;
    }
    this.notifyObservers();
  }
}
