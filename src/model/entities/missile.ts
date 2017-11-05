import Entity from "./Entity";
import Visitor from "../../visitor/visitor";
import MoveStrategy from "../../strategy/moveStrategy";
import SimpleMissile from "../../strategy/simpleMissileStrategy";

export default class Missile extends Entity {
  private _moveStrategy: MoveStrategy;
  private _angle: number;

  constructor(x: number, y: number, angle: number, strategy: MoveStrategy) {
    super(x, y, 40, 40);
    this._moveStrategy = strategy;
    this._angle = angle;
  }

  accept(visitor: Visitor) {
    visitor.visitMissile(this);
  }

  move() {
    const speed = 8;
    const dir = this._moveStrategy.getDirection(this._angle);
    return super.move(speed * dir[0], speed * dir[1]);
  }
}
