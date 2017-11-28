import Missile from '../model/entities/missile'

export default interface MoveStrategy {
  getDirection(missile: Missile): any;
};
