
import GameState from './gameState'

export default class Memento {
  private _gameState: GameState;

  constructor(s: GameState) {
    this._gameState = s;
  }

  get state() {
    return this._gameState;
  }
}
