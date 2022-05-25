// https://leetcode.com/problems/search-in-rotated-sorted-array/

// There is an integer array nums sorted in ascending order(with distinct values).

// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

// You must write an algorithm with O(log n) runtime complexity.

// Original sorted array
// [1, 2, 3, 4, 5, 6, 7]

// After rotation, it might be something like
// [3, 4, 5, 6, 7, 1, 2]
// [6, 7, 1, 2, 3, 4, 5]
// [1, 2, 3, 4, 5, 6, 7] <-- rotated and end up the same
// and etc..

// When you divide the rotated array into two halves, using mid index, at least one of subarray should remain sorted ALWAYS.

// [3, 4, 5, 6, 7, 1, 2]
// -> [3, 4, 5] [ 6, 7, 1, 2]
// the left side remains sorted

// [6, 7, 1, 2, 3, 4, 5]
// -> [6, 7, 1] [2, 3, 4, 5]
// the right side remains sorted

// [1, 2, 3, 4, 5, 6, 7]
// -> [1, 2, 3] [4, 5, 6, 7]
// Both sides remain sorted.

// If you know one side is sorted, the rest of logic becomes very simple.
// If one side is sorted, check if the target is in the boundary, otherwise it's on the other side.

// IF smallest <= target <= biggest
//   then target is here
// ELSE
//   then target is on the other side

var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // When dividing the roated array into two halves, one must be sorted.

    // Check if the left side is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        // target is in the left
        right = mid - 1;
      } else {
        // target is in the right
        left = mid + 1;
      }
    }

    // Otherwise, the right side is sorted
    else {
      if (nums[mid] <= target && target <= nums[right]) {
        // target is in the right
        left = mid + 1;
      } else {
        // target is in the left
        right = mid - 1;
      }
    }
  }

  return -1;
};
test("search", () => {
  expect(search([4, 5, 6, 7, 8, 1, 2, 3], 8)).toBe(4);
  expect(search([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
});
