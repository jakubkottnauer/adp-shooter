import Entity from "./Entity";

export default class Bird extends Entity {
  constructor(x: number, y: number) {
    super("assets/bird.png", x, y, 60, 60);
  }
}
