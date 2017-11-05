import MoveStrategy from "./moveStrategy";

export default class SimpleStrategy implements MoveStrategy {
  getDirection(angle: number) {
    const rad = toRadians(angle)
    return [Math.sin(rad), Math.cos(rad)];
  }
}

function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}
