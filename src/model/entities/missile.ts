import Entity from "./Entity";
import Visitor from '../../visitor/visitor'

export default class Missile extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 40, 40);
  }

  accept(visitor: Visitor) {
    visitor.visitMissile(this)
  }
}
