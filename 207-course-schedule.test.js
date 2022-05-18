import { canFinish } from "./207-course-schedule";

test("it works", () => {
  expect(canFinish(2, [[1, 0]])).toBe(true);
});

test("it works", () => {
  expect(
    canFinish(4, [
      [1, 0],
      [0, 1],
    ])
  ).toBe(false);
});
