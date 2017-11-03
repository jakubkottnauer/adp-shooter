import Bird from "./bird";
import BirdState from "./birdState";
import Missile from "../missile";
import AbstractFactory from "../../../factory/abstractFactory";

export default class DoubleShootingState implements BirdState {
  fire(bird: Bird): Array<Missile> {
    const [x, y] = bird.position;
    const factory = bird.missileFactory;
    return [
      factory.createMissile(x, y),
      factory.createMissile(x + 70, y)
    ];
  }
}