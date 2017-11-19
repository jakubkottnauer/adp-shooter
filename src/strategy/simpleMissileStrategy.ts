import Missile from "../model/entities/missile";
import MoveStrategy from "./moveStrategy";

export default class SimpleStrategy implements MoveStrategy {
  public getDirection(missile: Missile, gravity: number) {
    return [missile.force, missile.force * Math.sin(missile.angle)]
  }
}
