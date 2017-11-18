import GameCommand from "../commands/gameCommand";
import Observer from "../observer/observer";
import ModelInterface from "./modelInterface";

export default class ModelProxy implements ModelInterface {
  public subject: ModelInterface;

  constructor(model: ModelInterface) {
    this.subject = model;
  }

  get worldDimensions() {
    return this.subject.worldDimensions;
  }

  get entities() {
    return this.subject.entities;
  }
  get state() {
    return this.subject.state;
  }
  get score() {
    return this.subject.score;
  }
  get birdState() {
    return this.subject.birdState;
  }
  get realismState() {
    return this.subject.realismState;
  }

  public moveBirdDown() {
    this.subject.moveBirdDown();
  }
  public moveBirdUp() {
    this.subject.moveBirdUp();
  }
  public moveMissile(idx: number) {
    this.subject.moveMissile(idx);
  }
  public moveEnemy(idx: number) {
    this.subject.moveEnemy(idx);
  }
  public birdFire() {
    this.subject.birdFire();
  }
  public toggleBirdState() {
    this.subject.toggleBirdState();
  }
  public update() {
    this.subject.update();
  }

  public loadGame() {
    this.subject.loadGame();
  }

  public saveGame() {
    this.subject.saveGame();
  }

  public subscribe(observer: Observer) {
    this.subject.subscribe(observer);
  }

  public registerCommand(cmd: GameCommand, saveGame: boolean) {
    this.subject.registerCommand(cmd, saveGame);
  }
}
