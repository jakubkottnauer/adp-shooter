import AbstractFactory from "../../../factory/abstractFactory";
import MoveStrategy from "../../../strategy/moveStrategy";
import Enemy from "../enemy/enemy";
import Missile from "../missile";
import Bird from "./bird";
import BirdState from "./birdStates";

class MockStrategy implements MoveStrategy {
  public getDirection() {
    return [];
  }
}

class MockFactory implements AbstractFactory {
  public createMissile(x: number, y: number, angle: number, force: number) {
    return new Missile(x, y, angle, force, new MockStrategy());
  }

  public createEnemy(x: number, y: number) {
    return new Enemy(x, y);
  }
}

it("move should change position one point right", () => {
  const bird = new Bird(10, 10);
  bird.move(1, 0);
  expect(bird.position).toEqual([11, 10]);
});

it("shootingState is set to SINGLE by default", () => {
  const bird = new Bird(10, 10);
  expect(bird.state).toEqual(BirdState.Single);
});

it("toggleState() should toggle shooting state", () => {
  const bird = new Bird(10, 10);
  bird.toggleState()
  expect(bird.state).toEqual(BirdState.Double);
  bird.toggleState()
  expect(bird.state).toEqual(BirdState.Single);
});

it("fire() should create a missile", () => {
  const bird = new Bird(10, 10);
  const missiles = bird.fire(new MockFactory());
  expect(missiles.length).toEqual(1);
});
