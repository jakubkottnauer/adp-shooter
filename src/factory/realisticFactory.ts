import AbstractFactory from "./abstractFactory";
import Missile from "../model/entities/missile";
import JumpingEnemy from "../model/entities/enemy/jumpingEnemy";
import GravityMissileStrategy from "../strategy/gravityMissileStrategy";

export default class RealisticFactory implements AbstractFactory {
  createMissile(x: number, y: number, angle: number) {
    return new Missile(x, y, angle, new GravityMissileStrategy());
  }

  createEnemy(x: number, y: number) {
    return new JumpingEnemy(x, y);
  }
}
