import Missile from '../model/entities/missile'
import MoveStrategy from "./moveStrategy";

export default class GravityStrategy implements MoveStrategy {
  public getDirection(missile: Missile, gravity: number) { 
    const [x, y] = missile.position

    const time = (Date.now() - missile.timeCreated) / 1000.0
    missile.velocity = [missile.velocity[0], missile.velocity[1] + gravity * time];
    return [8 + missile.velocity[0], missile.velocity[1] * time]
  }
}
