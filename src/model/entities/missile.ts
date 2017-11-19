import MoveStrategy from "../../strategy/moveStrategy";
import SimpleMissile from "../../strategy/simpleMissileStrategy";
import Visitor from "../../visitor/visitor";
import TimedEntity from "./timedEntity";
import config from "../../config"

export default class Missile extends TimedEntity {
  private _moveStrategy: MoveStrategy;
  private _angle: number;
  private _force: number;
  private _velocity = [0, 0]

  constructor(x: number, y: number, angle: number, force: number, strategy: MoveStrategy) {
    super(x, y, 40, 40);
    this._moveStrategy = strategy;
    this._angle = toRadians(angle);
    this._force = force;
    this._velocity = [Math.cos(this._angle) * force, Math.sin(this._angle) * force];
  }

  public accept(visitor: Visitor) {
    visitor.visitMissile(this);
  }

  get velocity() {
    return this._velocity;
  }

  get angle() {
    return this._angle;
  }

  get force() {
    return this._force;
  }

  set velocity(val) {
    this._velocity = val;
  }

  public move() {
    const dir = this._moveStrategy.getDirection(this, config.gravity);

    return super.move(dir[0], dir[1]);
  }
}

function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}
