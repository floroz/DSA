import { alienOrder } from "./260-alien-dictionary";

test("should work", () => {
  expect(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])).toBe("wertf");
  expect(alienOrder(["z", "x"])).toBe("zx");
  expect(alienOrder(["z", "x", "z"])).toBe("");
  expect(alienOrder(["abc", "abcd", "frtw"])).toBe("");
});
