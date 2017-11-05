import MoveStrategy from "./moveStrategy";

export default class GravityStrategy implements MoveStrategy {
  getDirection(angle: number) {
    return [Math.sin(toRadians(angle)), 0.9];
  }
}

function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}
