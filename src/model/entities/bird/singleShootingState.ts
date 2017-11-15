import Bird from "./bird";
import BirdState from "./birdState";
import Missile from "../missile";
import AbstractFactory from "../../../factory/abstractFactory";

export default class SingleShootingState implements BirdState {
  fire(factory: AbstractFactory, x: number, y: number): Array<Missile> {
    return [factory.createMissile(x, y, 90)];
  }
}
