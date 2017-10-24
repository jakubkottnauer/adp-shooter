import Entity from "./Entity";

export default class Missile extends Entity {
  constructor(x: number, y: number) {
    super("assets/missile.png", x, y, 40, 40);
  }
}
