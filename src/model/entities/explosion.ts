import Visitor from "../../visitor/visitor";
import TimedEntity from "./timedEntity";

export default class Explosion extends TimedEntity {
  constructor(x: number, y: number) {
    super(x, y, 50, 50);
  }

  public accept(visitor: Visitor) {
    visitor.visitExplosion(this);
  }
}
