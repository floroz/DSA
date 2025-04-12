// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:

// Input: nums = [], target = 0
// Output: [-1,-1]

/**
 * Brute Force O(N) complexity
 */
var searchRange_brute = function (nums, target) {
  const start = nums.indexOf(target);

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === target) return [start, i];
  }

  return [start, -1];
};

var searchRange = function (nums, target) {
  // initiate binary search
  let left = 0;
  let right = nums.length - 1;

  // search for the first appearance index of target
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // try to push the array to the left smaller half
    // that's why even when nums[mid] == target, we still set r = mid
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // after the first while loop, the small index l should already be the first appearance index of target
  // otherwise, target is not in the array and [-1, -1] should be returned
  if (nums[left] !== target) return [-1, -1];

  // now we have the first appearance index of target, and it is the small index l
  // we can store it to a new variable for further usage
  let start = left;

  // since both of the indices were changed (both of them are at the first appearance index of target)
  // we need to reset the big index to the end of the array to do the second binary search
  // to find the last appearance index of the target
  right = nums.length - 1;

  // search for the last appearance index of the target
  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // nums[mid] <= target? l = mid : r = mid -1
    // the above will not work as it will run into infinite loop
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // after the second while loop, now l == nums.length - 1
  // now there are 2 conditions: target is also appeared at the last index of the array, or not
  // store the last appearance index of target to another variable
  let end = nums[left] === target ? left : left - 1;

  // finally return the two indices into an array
  return [start, end];
};

test("searchRange", () => {
  expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toStrictEqual([3, 4]);
  expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toStrictEqual([-1, -1]);
});
