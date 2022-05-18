import { maxProfit } from "./121-best-time-sell-stock";

test("should work", () => {
  const nums = [7, 1, 5, 3, 6, 4];
  const expected = 5;
  expect(maxProfit(nums)).toEqual(expected);
});
