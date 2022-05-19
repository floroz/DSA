import { countComponents } from "./323-number-connected-components";

describe("tests", () => {
  test("should work", () => {
    const input = [
      [0, 1],
      [1, 2],
      [3, 4],
    ];
    expect(countComponents(5, input)).toBe(2);
  });

  test("should work2", () => {
    const input = [
      [2, 3],
      [1, 2],
      [1, 3],
    ];
    expect(countComponents(4, input)).toBe(2);
  });

  test("should work3", () => {
    const input = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ];
    expect(countComponents(5, input)).toBe(1);
  });
});
