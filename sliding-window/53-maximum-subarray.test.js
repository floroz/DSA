// https://leetcode.com/problems/maximum-subarray/

/**
 * Approach 2: Dynamic Programming, Kadane's Algorithm
 *
 */

// set initials
// 1.1 first value in the arra. It doesn’t matter to us whether max is positive or negative.
// 1.2 we need an intermediate current positive value, because a negative value does not interest us, since -2 is always more than -5 and it means 0 + -2 > -5.
// At this point we've covered first value in the array, that's why we will move through array starting from the 1 index.
// current += nums[i] means that every time we take a new value, we will sum it with the past current value. This will help us discard lower values in the next step.
// max = Math.max(max, current) means that we choose only the highest value (previous max or new current).
// current = Math.max(current, 0) means that if the value was negative, then we throw it away and set zero as default. Why? Because it makes no sense to summarize the negative values, they simply do not interest us. The previous step is enough to compare negative values. There we will choose the minimum negative value (if it is the case i.e [-10, -3, -5, -2, -6] will return only -2 because it is the highest value from the negative ones.
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (!nums || !nums.length) return 0;
  if (nums.length === 1) return nums[0];

  let max = -Infinity;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];

    sum += num;

    sum = Math.max(num, sum);
    max = Math.max(max, sum);
  }

  return max;
};

/**
 * O(N^2) brute force solution
 */
var maxSubArray_brute = function (nums) {
  if (nums.length < 2) return nums[0] || 0;

  let sum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sub = 0;

    for (let j = i; j < nums.length; j++) {
      sub += nums[j];

      sum = Math.max(sum, sub);
    }
  }

  return sum;
};

test("maxSubArray", () => {
  expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
});
