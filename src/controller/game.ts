import GameView from "../view/game";
import ModelInterface from "../model/modelInterface";
import Keyboard from "./keyboard";

export default class GameController {
  private keyboard = new Keyboard(() => this.update());
  private model: ModelInterface;

  constructor(model: ModelInterface) {
    this.model = model;
  }

  // TODO command pattern
  //registerCommand(GameCommand cmd) {
  //  this.model.registerCommand(cmd)
  //}

  update() {
    if (this.keyboard.isUpDown()) this.model.moveBirdUp();
    if (this.keyboard.isDownDown()) this.model.moveBirdDown();
    if (this.keyboard.isSpaceDown()) this.model.birdFire();
    if (this.keyboard.isShiftDown()) this.model.toggleBirdState();
    //TODO: místo toho co je if (this.keyboard....) this.registerCommand(new MoveBirdUpCommand(model))
  }
}
