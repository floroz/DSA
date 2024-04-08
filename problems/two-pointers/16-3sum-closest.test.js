// https://leetcode.com/problems/3sum-closest/

// Time complexity O(N∗logN)
// Sorting the array will take O(N* logN). Overall searchTriplet() will take O(N * logN + N^2)O(N∗logN+N
// ​2
// ​​ ), which is asymptotically equivalent to O(N^2)O(N
// ​2
// ​​ ).

// Space complexity #
// The space complexity of the above algorithm will be O(N)O(N) which is required for sorting.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);

  let smallestDiff = Infinity;

  for (let anchor = 0; anchor < nums.length; anchor++) {
    let left = anchor + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[anchor] + nums[left] + nums[right];

      // if sum is target, we can stop as that's the closest
      // match we could find
      if (sum === target) return sum;

      // let compare the smallest diff with the current diff
      if (Math.abs(sum - target) < Math.abs(smallestDiff - target)) {
        smallestDiff = sum;
      }

      // if sum is greater than target, let's move the right pointer
      // to lower  the total sum
      else if (sum > target) right--;
      // if sum is smaller than target, let's move the left pointer
      // to increase  the total sum
      else if (sum < target) left++;
    }
  }

  return smallestDiff;
}

test.each([
  [[-1, 2, 1, -4], 1, 2],
  [[0, 1, 2], 3, 3],
])("threeSumClosest %s target: %s", (nums, target, res) => {
  expect(threeSumClosest(nums, target)).toBe(res);
});
