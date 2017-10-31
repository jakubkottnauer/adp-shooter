import Entity from "../Entity";
import BirdState from "./birdStates";
import Missile from "../missile";
import Visitor from "../../../visitor/visitor";
import SingleShootingState from "./singleShootingState";
import DoubleShootingState from "./doubleShootingState";

export default class Bird extends Entity {
  private _state = BirdState.Single;
  private stateInstance = new SingleShootingState();

  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  get state() {
    return this._state;
  }

  accept(visitor: Visitor) {
    visitor.visitBird(this);
  }

  fire(): Array<Missile> {
    return this.stateInstance.fire(this);
  }

  toggleState() {
    if (this._state == BirdState.Single) {
      this._state = BirdState.Double;
      this.stateInstance = new DoubleShootingState();
    } else {
      this._state = BirdState.Single;
      this.stateInstance = new SingleShootingState();
    }
  }
}
