import Bird from '../model/entities/bird/bird'
import Enemy from '../model/entities/enemy/enemy'
import Entity from '../model/entities/entity'
import Explosion from '../model/entities/explosion'
import Missile from '../model/entities/missile'

export default interface Visitor {
  visitMissile(missile: Missile): void;
  visitBird(bird: Bird): void;
  visitEnemy(enemy: Enemy): void;
  visitExplosion(explosion: Explosion): void;
}
