import Missile from "../model/entities/missile";
import MoveStrategy from "./moveStrategy";

export default class SimpleStrategy implements MoveStrategy {
  public getDirection(missile: Missile) {
    return [missile.force, missile.force * Math.cos(missile.angle)]
  }
}
