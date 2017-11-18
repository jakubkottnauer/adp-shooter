import ModelInterface from "../model/modelInterface";
import GameCommand from "./gameCommand";

export default class MoveBirdDownCommand extends GameCommand {

  constructor(model: ModelInterface) {
    super(model)
  }

  public execute() {
    this._model.moveBirdDown();
  }
}
