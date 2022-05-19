import { numIslands } from "./200-number-of-islands";

test("should work", () => {
  expect(
    numIslands([
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ])
  ).toBe(3);
});
