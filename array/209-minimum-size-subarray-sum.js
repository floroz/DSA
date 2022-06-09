// https://leetcode.com/problems/minimum-size-subarray-sum/

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  if (!nums || !nums.length) return 0;

  let len = nums.length;

  let left = 0;
  let sum = 0;

  let minWindow = Infinity;

  for (let right = 0; right < len; right++) {
    sum += nums[right];

    while (sum >= target) {
      minWindow = Math.min(minWindow, right - left + 1);
      // shrink window
      sum -= nums[left];
      left++;
    }
  }

  return minWindow === Infinity ? 0 : minWindow;
};
