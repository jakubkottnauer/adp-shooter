import State from "../gameStates";
import Observer from "../observer/observer";
import Entity from "./entities/entity";

export default interface ModelInterface {
  readonly worldDimensions: [number, number];
  readonly entities: Entity[];
  readonly state: State;
  readonly score: number;
  readonly birdState: any;
  readonly realismState: any;

  moveBirdDown(): void;
  moveBirdUp(): void;
  moveMissile(idx: number): void;
  moveEnemy(idx: number): void;
  birdFire(): void;
  toggleBirdState(): void;
  update(): void;
  loadGame(): void;
  saveGame(): void;

  subscribe(observer: Observer): void;
};
