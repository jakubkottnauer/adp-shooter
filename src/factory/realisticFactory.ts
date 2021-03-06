import JumpingEnemy from "../model/entities/enemy/jumpingEnemy";
import Missile from "../model/entities/missile";
import GravityMissileStrategy from "../strategy/gravityMissileStrategy";
import AbstractFactory from "./abstractFactory";

export default class RealisticFactory implements AbstractFactory {
  public createMissile(x: number, y: number, angle: number, force: number, gravity: number) {
    return new Missile(x, y, angle, force, gravity, new GravityMissileStrategy());
  }

  public createEnemy(x: number, y: number) {
    return new JumpingEnemy(x, y);
  }
}
