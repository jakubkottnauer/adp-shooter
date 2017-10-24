import Entity from "./Entity";

export default class Explosion extends Entity {
  constructor(x: number, y: number) {
    super("assets/kill.png", x, y, 50, 50);
  }
}
