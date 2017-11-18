import ModelInterface from "../model/modelInterface";
import GameCommand from "./gameCommand";

export default class BirdFireCommand extends GameCommand {

  constructor(model: ModelInterface) {
    super(model)
  }

  public execute() {
    this._model.birdFire();
  }
}
