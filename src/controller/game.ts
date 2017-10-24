import GameView from "../view/game";
import Model from "../model/model";
import Keyboard from "./keyboard";

export default class GameController {
  keyboard = new Keyboard(() => this.update());
  model: Model;
  constructor(model: Model) {
    this.model = model;
  }

  update() {
    if (this.keyboard.isUpDown()) this.model.moveBirdUp();
    if (this.keyboard.isDownDown()) this.model.moveBirdDown();
    if (this.keyboard.isSpaceDown()) this.model.createMissile();
  }
}
