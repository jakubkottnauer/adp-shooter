import AbstractFactory from "../../../factory/abstractFactory";
import SimpleFactory from "../../../factory/simpleFactory";
import Visitor from "../../../visitor/visitor";
import Entity from "../Entity";
import Missile from "../missile";
import BirdState from "./birdStates";
import DoubleShootingState from "./doubleShootingState";
import SingleShootingState from "./singleShootingState";

export default class Bird extends Entity {
  private _shootingState = BirdState.Single;
  private _stateInstance = new SingleShootingState();

  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  get state() {
    return this._shootingState;
  }

  public accept(visitor: Visitor) {
    visitor.visitBird(this);
  }

  public fire(factory: AbstractFactory): Missile[] {
    return this._stateInstance.fire(
      factory,
      this.position[0],
      this.position[1]
    );
  }

  public toggleState() {
    if (this._shootingState == BirdState.Single) {
      this._shootingState = BirdState.Double;
      this._stateInstance = new DoubleShootingState();
    } else {
      this._shootingState = BirdState.Single;
      this._stateInstance = new SingleShootingState();
    }
  }
}
