import Enemy from "../model/entities/enemy/enemy";
import Missile from "../model/entities/missile";
import SimpleMissileStrategy from "../strategy/simpleMissileStrategy";
import AbstractFactory from "./abstractFactory";

export default class SimpleFactory implements AbstractFactory {
  public createMissile(x: number, y: number, angle: number, force: number, gravity: number) {
    return new Missile(x, y, angle, force, gravity, new SimpleMissileStrategy());
  }

  public createEnemy(x: number, y: number) {
    return new Enemy(x, y);
  }
}
