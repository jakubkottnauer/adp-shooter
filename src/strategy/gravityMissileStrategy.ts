import MoveStrategy from "./moveStrategy";

export default class GravityStrategy implements MoveStrategy {
  getDirection() {
    return [0, 0.9];
  }
}
