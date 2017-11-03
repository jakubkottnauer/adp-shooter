import Missile from "../model/entities/missile";
import Enemy from "../model/entities/enemy";

export default interface AbstractFactory {
  createMissile(x: number, y: number): Missile;
  createEnemy(x: number, y: number): Enemy;
};
