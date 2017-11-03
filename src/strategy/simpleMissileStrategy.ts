import MoveStrategy from "./moveStrategy";

export default class SimpleStrategy implements MoveStrategy {
  getDirection() {
    return [0, 0];
  }
}
