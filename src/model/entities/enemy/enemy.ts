import Visitor from '../../../visitor/visitor'
import Entity from "../Entity";

export default class Enemy extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  public accept(visitor: Visitor) {
    visitor.visitEnemy(this)
  }

  public move(dx: number = 0, dy: number = 0) {
     return super.move(dx, dy)
  }
}
