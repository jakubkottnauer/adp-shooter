import MoveStrategy from "./moveStrategy";
import Missile from '../model/entities/missile'

export default class GravityStrategy implements MoveStrategy {
  getDirection(missile: Missile, gravity: number) { 
    const [x, y] = missile.position

    const time = (Date.now() - missile.timeCreated) / 1000.0
    missile.velocity = [missile.velocity[0], missile.velocity[1] + gravity * time];
    return [8 + missile.velocity[0], missile.velocity[1] * time]
  }
}
