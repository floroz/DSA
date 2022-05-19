// O(N) Time complexity
// O(N) Space complexity (hashmap)
export const twoSum = (nums, target) => {
  let size = nums.length;

  if (size < 2) return [];

  const cache = new Map();

  for (let i = 0; i < size; i++) {
    const diff = target - nums[i];

    if (cache.has(diff)) {
      return [cache.get(diff), i];
    } else {
      cache.set(nums[i], i);
    }
  }

  return [];
};

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
