import AbstractFactory from "../factory/abstractFactory";
import State from "../gameStates";
import Bird from "../model/entities/bird/bird";
import Enemy from "../model/entities/enemy/enemy";
import Entity from "../model/entities/entity";
import Explosion from "../model/entities/explosion";
import Missile from "../model/entities/missile";
import Subject from "../observer/subject";

export default class GameState {
  private _bird: Bird;
  private _enemies = new Array<Enemy>();
  private _missiles = new Array<Missile>();
  private _explosions = new Array<Explosion>();
  private _state: State = State.Playing;
  private _score = 0;

  get bird() {
    return this._bird;
  }
  get enemies() {
    return this._enemies;
  }
  get missiles() {
    return this._missiles;
  }
  get explosions() {
    return this._explosions;
  }
  get state() {
    return this._state;
  }
  get score() {
    return this._score;
  }

  set bird(v) {
    this._bird = v;
  }
  set enemies(v) {
    this._enemies = v;
  }
  set missiles(v) {
    this._missiles = v;
  }
  set explosions(v) {
    this._explosions = v;
  }
  set state(v) {
    this._state = v;
  }
  set score(v) {
    this._score = v;
  }
}
