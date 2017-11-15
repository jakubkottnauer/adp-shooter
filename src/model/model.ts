import Bird from "../model/entities/bird/bird";
import Enemy from "../model/entities/enemy/enemy";
import Entity from "../model/entities/entity";
import Subject from "../observer/subject";
import Missile from "../model/entities/missile";
import Explosion from "../model/entities/explosion";
import State from "../gameStates";
import AbstractFactory from "../factory/abstractFactory";
import ModelInterface from "./modelInterface";
import Memento from '../memento/memento';
import GameState from '../memento/gameState';

export default class Model extends Subject implements ModelInterface {
  private _bird: Bird;
  private _enemies = new Array<Enemy>();
  private _missiles = new Array<Missile>();
  private _explosions = new Array<Explosion>();
  private _worldDimensions: [number, number];
  private _savedGames = new Array<Memento>();
  private _state = State.Playing;
  private _score = 0;
  private _factory: AbstractFactory;

  constructor(width: number, height: number, factory: AbstractFactory) {
    super();
    this._worldDimensions = [width, height];
    this._factory = factory;
    this._bird = new Bird(20, height / 2, this._factory);
    this.generateEnemies(2, 5);
  }

  private generateEnemies(min: number, max: number) {
    const enemyCount = this.randomBetween(min, max);
    const [width, height] = this.worldDimensions;
    for (let i = 0; i < enemyCount; i++) {
      const enemy = this._factory.createEnemy(
        this.randomBetween(100 + i * 70, width - 100),
        this.randomBetween(5, height - 50)
      );
      this._enemies.push(enemy);
    }
  }

  private randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private moveBird(dx: number, dy: number) {
    const [width, height] = this.worldDimensions;
    if (!this._bird.isWithinWorld(width, height)) {
      return;
    }
    this._bird.move(dx, dy);
  }

  get worldDimensions() {
    return this._worldDimensions;
  }

  get entities(): Array<Entity> {
    return [...this._enemies, ...this._explosions, this._bird, ...this._missiles];
  }

  get state() {
    return this._state;
  }

  get score() {
    return this._score;
  }

  get birdState() {
    return this._bird.state;
  }

  get realismState() {
    return true;
    // TODO: fix
    //return GAME_MODE === Mode.Realistic;
  }

  saveGame() {
    const state = new GameState();
    // serialize
    const m = new Memento(state)
    this._savedGames.push(m)
  }

  loadGame() {
    if (this._savedGames.length === 0) return;
    const state = this._savedGames.pop();
    // deserialize
  }

  moveBirdDown() {
    this.moveBird(0, 5);
  }

  moveBirdUp() {
    this.moveBird(0, -5);
  }

  moveMissile(idx: number) {
    const [width, height] = this.worldDimensions;
    if (!this._missiles[idx].move()) {
      this._missiles.splice(idx, 1);
      return;
    }
  }

  moveEnemy(idx: number) {
    this._enemies[idx].move();
  }

  // TODO: birdFire dostane missileFactory jako param
  birdFire() {
    if (this._missiles.length >= 3) {
      return;
    }

    const newMissiles = this._bird.fire();
    this._missiles = [...this._missiles, ...newMissiles];
  }

  toggleBirdState() {
    this._bird.toggleState();
  }

  update() {
    for (let i = this._missiles.length - 1; i >= 0; i--) {
      this.moveMissile(i);
    }

    for (let i = this._enemies.length - 1; i >= 0; i--) {
      this.moveEnemy(i);
    }

    for (let j = this._missiles.length - 1; j >= 0; j--) {
      for (let i = this._enemies.length - 1; i >= 0; i--) {
        if (this._missiles[j].collidesWith(this._enemies[i])) {
          const [missX, missY] = this._missiles[j].position;
          const exp = new Explosion(missX, missY);
          this._explosions.push(exp);
          this._score++;
          setTimeout(() => {
            this._explosions = new Array<Explosion>();
          }, 500);
          this._enemies.splice(i, 1);
          this._missiles.splice(j, 1);
          return;
        }
      }
    }

    if (this._enemies.length === 0) {
      this._state = State.Victory;
    }
    this.notifyObservers();
  }
}
