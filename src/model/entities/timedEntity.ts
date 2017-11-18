import Entity from "./entity";

export default abstract class TimedEntity extends Entity {
  private _timeCreated: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    id: number = 0
  ) {
    super(x, y, width, height, id);
    this._timeCreated = Date.now();
  }

  get timeCreated() {
    return this._timeCreated;
  }

  public shouldBeDeleted(deathTime: number) {
    return this._timeCreated + deathTime > Date.now();
  }
}
