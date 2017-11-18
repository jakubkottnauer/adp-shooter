import ModelInterface from "../model/modelInterface";

export default abstract class GameCommand {
  protected _model: ModelInterface;

  constructor(model: ModelInterface) {
    this._model = model;
  }
  public execute(model: ModelInterface) {}
}
