// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

/**
 * Strategy:
 *
 * We want to compare the left and right number,
 *  - If their sum is greater than the target, because the array is sorted, we can change our window to remove the  highest number.
 *  - If their sum is lower, we than move our left pointer to a greater num
 */

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  if (target == null || nums == null || !nums.length) return [];

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum == target) {
      return [left + 1, right + 1];
    }

    if (sum > target) {
      right--;
    } else {
      left++;
    }
  }

  return [];
}

test("twoSum", () => {
  expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([1, 2]);
  expect(twoSum([2, 3, 4], 6)).toStrictEqual([1, 3]);
  expect(twoSum([-1, 0], -1)).toStrictEqual([1, 2]);
  expect(twoSum([0, 0, 3, 4], 0)).toStrictEqual([1, 2]);
});
