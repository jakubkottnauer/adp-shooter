import AbstractFactory from "./abstractFactory";
import Missile from "../model/entities/missile";
import Enemy from "../model/entities/enemy";
import GravityMissileStrategy from "../strategy/gravityMissileStrategy";

export default class RealisticFactory implements AbstractFactory {
  createMissile(x: number, y: number) {
    return new Missile(x, y, new GravityMissileStrategy());
  }

  createEnemy(x: number, y: number) {
    return new Enemy(x, y);
  }
}
