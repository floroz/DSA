import { twoSum } from "./1-two-sum";

test("should work", () => {
  const nums = [2, 7, 11, 15];
  const target = 9;
  expect(twoSum(nums, target)).toEqual(expect.arrayContaining([0, 1]));
  expect(twoSum(nums, target)).toHaveLength(2);
});

test("should work", () => {
  const nums = [3, 2, 4];
  const target = 6;
  expect(twoSum(nums, target)).toEqual(expect.arrayContaining([1, 2]));
  expect(twoSum(nums, target)).toHaveLength(2);
});
