// https://leetcode.com/problems/squares-of-a-sorted-array/submissions/

// Time complexity O(N)
// The time complexity of the above algorithm will be O(N) as we are iterating the input array only once.

// Space complexity O(N)
// The space complexity of the above algorithm will also be O(N); this space will be used for the output array.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  if (!nums || !nums.length) return [];
  let result = [];
  let i = nums.length - 1;
  let l = 0;
  let r = nums.length - 1;

  while (i >= 0) {
    let left = nums[l] ** 2;
    let right = nums[r] ** 2;

    if (left > right) {
      result[i] = left;
      l++;
    } else {
      result[i] = right;
      r--;
    }

    i--;
  }

  return result;
};

test.each([
  [
    [-4, -1, 0, 3, 10],
    [0, 1, 9, 16, 100],
  ],
  [
    [-7, -3, 2, 3, 11],
    [4, 9, 9, 49, 121],
  ],
])("sortedSquares %s", (nums, res) => {
  expect(sortedSquares(nums)).toEqual(res);
});
