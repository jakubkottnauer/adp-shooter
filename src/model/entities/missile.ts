import Entity from "./Entity";
import Visitor from "../../visitor/visitor";
import MoveStrategy from "../../strategy/moveStrategy";
import SimpleMissile from "../../strategy/simpleMissileStrategy";

export default class Missile extends Entity {
  private moveStrategy: MoveStrategy;

  constructor(x: number, y: number, strategy: MoveStrategy) {
    super(x, y, 40, 40);
    this.moveStrategy = strategy;
  }

  accept(visitor: Visitor) {
    visitor.visitMissile(this);
  }

  move(dx: number, dy: number) {
    const dir = this.moveStrategy.getDirection();
    super.move(dx + dir[0], dy + dir[1]);
  }
}
