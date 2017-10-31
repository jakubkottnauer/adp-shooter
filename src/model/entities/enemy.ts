import Entity from "./Entity";
import Visitor from '../../visitor/visitor'

export default class Enemy extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  accept(visitor: Visitor) {
    visitor.visitEnemy(this)
  }
}
