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
    if (this.keyboard.isLeftDown()) this.model.moveBird(-3, 0);
    if (this.keyboard.isRightDown()) this.model.moveBird(3, 0);
    if (this.keyboard.isUpDown()) this.model.moveBird(0, -3);
    if (this.keyboard.isDownDown()) this.model.moveBird(0, 3);
  }
}
