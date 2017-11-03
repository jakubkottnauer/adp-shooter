import AbstractFactory from "./abstractFactory";
import Missile from "../model/entities/missile";
import Enemy from "../model/entities/enemy";
import SimpleMissileStrategy from "../strategy/simpleMissileStrategy";

export default class SimpleFactory implements AbstractFactory {
  createMissile(x: number, y: number) {
    return new Missile(x, y, new SimpleMissileStrategy());
  }

  createEnemy(x: number, y: number) {
    return new Enemy(x, y);
  }
}
