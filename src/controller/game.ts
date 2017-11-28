import BirdFireCommand from "../commands/birdFireCommand";
import GameCommand from "../commands/gameCommand";
import LoadGameCommand from "../commands/loadGameCommand";
import MoveBirdDownCommand from "../commands/moveBirdDownCommand";
import MoveBirdUpCommand from "../commands/moveBirdUpCommand";
import SaveGameCommand from "../commands/saveGameCommand";
import ToggleBirdStateCommand from "../commands/toggleBirdStateCommand";
import ModelInterface from "../model/modelInterface";
import GameView from "../view/game";
import Keyboard from "./keyboard";

export default class GameController {
  private keyboard = new Keyboard(() => this.catch());
  private model: ModelInterface;

  constructor(model: ModelInterface) {
    this.model = model;
  }

  private registerCommand(cmd: GameCommand, saveGame: boolean = true) {
    this.model.registerCommand(cmd, saveGame);
  }

  public catch() {
    if (this.keyboard.isUpDown()) { this.registerCommand(new MoveBirdUpCommand(this.model)); }
    if (this.keyboard.isDownDown()) { this.registerCommand(new MoveBirdDownCommand(this.model)); }
    if (this.keyboard.isSpaceDown()) { this.registerCommand(new BirdFireCommand(this.model)); }
    if (this.keyboard.isShiftDown()) { this.registerCommand(new ToggleBirdStateCommand(this.model)); }
    if (this.keyboard.isLKeyDown()) { this.registerCommand(new LoadGameCommand(this.model), false); }
    if (this.keyboard.isKKeyDown()) { this.registerCommand(new SaveGameCommand(this.model), false); }
  }
}
