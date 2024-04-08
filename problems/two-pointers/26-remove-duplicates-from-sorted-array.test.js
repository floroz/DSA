// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

// Time Complexity
// The time complexity of the above algorithm will be O(N), where ‘N’ is the total number of elements in the given array.

// Space Complexity
// The algorithm runs in constant space O(1).

const removeDuplicates = (nums) => {
  if (!nums || !nums.length || nums.length < 2) return [];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) {
      nums.splice(i, 1);
      i--;
    }
  }

  return nums;
};

test.each([
  [
    [1, 1, 2],
    [1, 2],
  ],
  [
    [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
    [0, 1, 2, 3, 4],
  ],
])("removeDuplicates %s", (nums, res) => {
  expect(removeDuplicates(nums)).toEqual(res);
});
