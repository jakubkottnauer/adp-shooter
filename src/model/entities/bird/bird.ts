import Entity from "../Entity";
import BirdState from "./birdStates";
import Missile from "../missile";
import Visitor from '../../../visitor/visitor'

export default class Bird extends Entity {

  state = BirdState.Single

  constructor(x: number, y: number) {
    super(x, y, 60, 60);
  }

  accept(visitor: Visitor) {
    visitor.visitBird(this)
  }

  fire() : Array<Missile> {
    const [ x, y ] = this.position;
    return [new Missile(x, y)];
  }
}
