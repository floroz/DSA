import { validTree } from "./261-graph-valid-tree";

describe("tests", () => {
  test("should work", () => {
    const input = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 4],
    ];
    expect(validTree(5, input)).toBe(true);
  });

  test("should not pass", () => {
    const input = [[[1, 0]]];
    expect(validTree(3, input)).toBe(false);
  });

  test("should detect unconnected", () => {
    const input = [
      [0, 1],
      [2, 3],
    ];
    expect(validTree(2, input)).toBe(false);
  });

  test("should detect cycle", () => {
    const input = [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 3],
      [1, 4],
    ];
    expect(validTree(5, input)).toBe(false);
  });
});
