import ModelInterface from "./modelInterface";
import Observer from "../observer/observer";

export default class ModelProxy implements ModelInterface {
  subject: ModelInterface;

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

  moveBirdDown() {
    this.subject.moveBirdDown();
  }
  moveBirdUp() {
    this.subject.moveBirdUp();
  }
  moveMissile(idx: number) {
    this.subject.moveMissile(idx);
  }
  moveEnemy(idx: number) {
    this.subject.moveEnemy(idx);
  }
  birdFire() {
    this.subject.birdFire();
  }
  toggleBirdState() {
    this.subject.toggleBirdState();
  }
  update() {
    this.subject.update();
  }

  loadGame() {
    this.subject.loadGame();
  }

  saveGame() {
    this.subject.saveGame();
  }

  subscribe(observer: Observer) {
    this.subject.subscribe(observer);
  }
}
