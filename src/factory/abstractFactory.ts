import Enemy from "../model/entities/enemy/enemy";
import Missile from "../model/entities/missile";

export default interface AbstractFactory {
  createMissile(x: number, y: number, angle: number): Missile;
  createEnemy(x: number, y: number): Enemy;
};
