import Bird from "../../src/model/bird";

it("moveRight should change position one point right", () => {
  const bird = new Bird(10, 10);
  bird.moveRight();
  expect(bird.position).toEqual({ x: 11, y: 10 });
});

it("moveLeft should change position one point left", () => {
  const bird = new Bird(10, 10);
  bird.moveLeft();
  expect(bird.position).toEqual({ x: 9, y: 10 });
});
