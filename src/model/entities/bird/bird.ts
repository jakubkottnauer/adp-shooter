import Entity from "../Entity";
import BirdState from "./birdStates";
import Missile from "../missile";
import Visitor from "../../../visitor/visitor";
import SingleShootingState from "./singleShootingState";
import DoubleShootingState from "./doubleShootingState";
import SimpleFactory from "../../../factory/simpleFactory";
import AbstractFactory from "../../../factory/abstractFactory";

export default class Bird extends Entity {
  private _state = BirdState.Single;
  private _stateInstance = new SingleShootingState();
  private _missileFactory: AbstractFactory;

  constructor(x: number, y: number, factory: AbstractFactory) {
    super(x, y, 60, 60);
    this._missileFactory = factory;
  }

  get state() {
    return this._state;
  }

  get missileFactory() {
    return this._missileFactory;
  }

  accept(visitor: Visitor) {
    visitor.visitBird(this);
  }

  fire(): Array<Missile> {
    return this._stateInstance.fire(this);
  }

  toggleState() {
    if (this._state == BirdState.Single) {
      this._state = BirdState.Double;
      this._stateInstance = new DoubleShootingState();
    } else {
      this._state = BirdState.Single;
      this._stateInstance = new SingleShootingState();
    }
  }
}
