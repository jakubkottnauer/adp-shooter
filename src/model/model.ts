import GameCommand from "../commands/gameCommand";
import AbstractFactory from "../factory/abstractFactory";
import State from "../gameStates";
import GameState from "../memento/gameState";
import Memento from "../memento/memento";
import Bird from "../model/entities/bird/bird";
import Enemy from "../model/entities/enemy/enemy";
import Entity from "../model/entities/entity";
import Explosion from "../model/entities/explosion";
import Missile from "../model/entities/missile";
import Subject from "../observer/subject";
import ModelInterface from "./modelInterface";

export default class Model extends Subject implements ModelInterface {
  private _bird: Bird;
  private _enemies = new Array<Enemy>();
  private _missiles = new Array<Missile>();
  private _explosions = new Array<Explosion>();
  private _worldDimensions: [number, number];
  private _savedGames = new Array<Memento>();
  private _state: State = State.Playing;
  private _score = 0;
  private _factory: AbstractFactory;
  private _commands = new Array<GameCommand>();

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

  private clone<T>(instance: T): T {
    const copy = new (instance.constructor as { new (): T })();
    Object.assign(copy, instance);
    return copy;
  }

  get worldDimensions() {
    return this._worldDimensions;
  }

  get entities(): Entity[] {
    return [
      ...this._enemies,
      ...this._explosions,
      this._bird,
      ...this._missiles
    ];
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

  public saveGame() {
    const state = new GameState();

    state.bird = this.clone(this._bird);
    state.enemies = this._enemies.map(e => this.clone(e));
    state.missiles = this._missiles.map(e => this.clone(e));
    state.explosions = this._explosions.map(e => this.clone(e));
    state.state = this._state;
    state.score = this._score;

    const m = new Memento(state);
    this._savedGames.push(m);
  }

  public loadGame() {
    if (this._savedGames.length === 0) {
      return;
    }

    const state = this._savedGames.pop().state;
    this._bird = this.clone(state.bird);
    this._enemies = state.enemies.map(e => this.clone(e));
    this._missiles = state.missiles.map(e => this.clone(e));
    this._explosions = state.explosions.map(e => this.clone(e));
    this._state = state.state;
    this._score = state.score;
  }

  public moveBirdDown() {
    this.moveBird(0, 5);
  }

  public moveBirdUp() {
    this.moveBird(0, -5);
  }

  public moveMissile(idx: number) {
    const [width, height] = this.worldDimensions;
    if (!this._missiles[idx].move()) {
      this._missiles.splice(idx, 1);
      return;
    }
  }

  public moveEnemy(idx: number) {
    this._enemies[idx].move();
  }

  // TODO: birdFire dostane missileFactory jako param
  public birdFire() {
    if (this._missiles.length >= 3) {
      return;
    }

    const newMissiles = this._bird.fire();
    this._missiles = [...this._missiles, ...newMissiles];
  }

  public toggleBirdState() {
    this._bird.toggleState();
  }

  public registerCommand(cmd: GameCommand, saveGame: boolean) {
    this._commands.push(cmd);
    if (saveGame) { this.saveGame(); }
  }

  public update() {
    this._commands.forEach(c => {
      c.execute(this);
    });

    this._commands = [];

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
