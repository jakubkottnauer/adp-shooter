import Bird from "./bird";
import BirdState from "./birdState";
import Missile from '../missile'

export default class SingleShootingState implements BirdState {
  fire(bird: Bird): Array<Missile> {
    const [x, y] = bird.position;
    return [new Missile(x, y)];
  }
}
