import AbstractFactory from "../../../factory/abstractFactory";
import Missile from "../missile";
import Bird from "./bird";
import BirdState from "./birdState";
import config from "../../../config"

export default class SingleShootingState implements BirdState {
  public fire(factory: AbstractFactory, x: number, y: number): Missile[] {
    return [factory.createMissile(x, y, 90, config.missileForce)];
  }
}
