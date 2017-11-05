import Entity from "../Entity";
import Visitor from '../../../visitor/visitor'

export default class Enemy extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  accept(visitor: Visitor) {
    visitor.visitEnemy(this)
  }

  move(dx: number = 0, dy: number = 0) {
     return super.move(dx, dy)
  }
}
