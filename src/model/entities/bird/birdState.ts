import Bird from './bird'
import Missile from '../missile'

export default interface BirdState {
  fire(bird: Bird): Array<Missile>;
}
