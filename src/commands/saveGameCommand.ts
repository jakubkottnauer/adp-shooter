import ModelInterface from "../model/modelInterface";
import GameCommand from "./gameCommand";

export default class SaveGameCommand extends GameCommand {
  constructor(model: ModelInterface) {
    super(model);
  }

  public execute() {
    this._model.saveGame();
  }
}
