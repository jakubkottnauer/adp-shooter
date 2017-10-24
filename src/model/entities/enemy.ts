import Entity from "./Entity";

export default class Enemy extends Entity {
  constructor(x: number, y: number) {
    super("assets/pig.png", x, y, 60, 60);
  }
}
