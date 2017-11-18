import Visitor from "../../visitor/visitor";
import Entity from "./Entity";

export default class Explosion extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 50, 50);
    //TODO: do not use timeout
  }

  public accept(visitor: Visitor) {
    visitor.visitExplosion(this);
  }
}
