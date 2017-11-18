import Entity from "./entity";

class MockEntity extends Entity {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }
}

let entity: MockEntity;

beforeEach(() => {
  entity = new MockEntity(10, 20, 30, 40);
});

it("position getter returns position", () => {
  expect(entity.position).toEqual([10, 20]);
});

it("dimensions getter returns dimensions", () => {
  expect(entity.dimensions).toEqual([30, 40]);
});

it("collidesWith() returns true if there is a collision", () => {
  const entity2 = new MockEntity(10, 20, 30, 40)
  expect(entity.collidesWith(entity2)).toEqual(true)
})

it("collidesWith() returns false if there is not a collision", () => {
  const entity2 = new MockEntity(100, 20, 30, 40)
  expect(entity.collidesWith(entity2)).toEqual(false)
})

it("isWithinWorld() returns true if entity is within the world", () => {
  expect(entity.isWithinWorld(60, 60)).toEqual(true)
})

it("isWithinWorld() returns false if entity is not within the world", () => {
  expect(entity.isWithinWorld(60, 59)).toEqual(false)
})
