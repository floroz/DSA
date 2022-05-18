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
