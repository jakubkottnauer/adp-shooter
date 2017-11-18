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
  private _missileFactory: AbstractFactory;

  constructor(x: number, y: number, factory: AbstractFactory) {
    super(x, y, 60, 60);
    this._missileFactory = factory;
  }

  get state() {
    return this._shootingState;
  }

  public accept(visitor: Visitor) {
    visitor.visitBird(this);
  }

  public fire(): Missile[] {
    return this._stateInstance.fire(
      this._missileFactory,
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
