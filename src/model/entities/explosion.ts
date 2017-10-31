import Entity from "./Entity";
import Visitor from "../../visitor/visitor";

export default class Explosion extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 50, 50);
  }

  accept(visitor: Visitor) {
    visitor.visitExplosion(this)
  }
}
